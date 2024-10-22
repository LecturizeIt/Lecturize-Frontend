import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Input from "../../ui/Input/Input.ui";
import Button from "../../ui/Button/Button.ui";
import { updateLecture, uploadImage } from "../../api/lecture";
import { Type } from "../../domain/enums/type.enums";
import { convertToISO8601WithUTC } from "../../utils/lib/convertToISO8601WithUTC.utils";
import { fetchTags } from "../../api/tags";
import { ErrorNotification } from "../../ui/ErrorNotification/ErrorNotification.ui";
import { formatDateTimeForInput } from "../../utils/lib/date.utils";
import { useNavigate } from "react-router-dom";
import { ITag } from "../../domain/models/tag.model";
import { ILectureDetail } from "../../domain/models/lecture.model";

interface ILectureFormUpdateProps {
  lecture: ILectureDetail;
  onClose: () => void;
}

const LectureFormUpdate: React.FC<ILectureFormUpdateProps> = ({ lecture, onClose }) => {
  const navigate = useNavigate();

  const [type, setType] = useState<Type>(lecture.type as Type);
  const [availableTags, setAvailableTags] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDescription, setImageDescription] = useState<string>("");


  const [formData, setFormData] = useState({
    title: lecture.title || "",
    lecturer: lecture.lecturer || "",
    description: lecture.description || "",
    startsAt: formatDateTimeForInput(lecture.startsAt),
    endsAt: formatDateTimeForInput(lecture.endsAt),
    address: lecture.address || "",
    url: lecture.url || "",
    type: lecture.type as Type,
    tags: lecture.tags,
    maximumCapacity: lecture.maximumCapacity ? String(lecture.maximumCapacity) : "",
  });

  const MAX_TAGS = 5;

  useEffect(() => {
    const loadTags = async () => {
      try {
        const tags = await fetchTags();
        setAvailableTags(tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    loadTags();
  }, []);

  useEffect(() => {
    
    setFormData(prevData => ({ ...prevData, tags: [] }));

    
    switch (type) {
    case Type.PRESENTIAL:
      setFormData(prevData => ({ ...prevData, url: "", address: prevData.address, maximumCapacity: prevData.maximumCapacity }));
      break;
    case Type.ONLINE:
      setFormData(prevData => ({ ...prevData, url: prevData.url, address: "", maximumCapacity: prevData.maximumCapacity }));
      break;
    case Type.HYBRID:
      setFormData(prevData => ({ ...prevData, url: prevData.url, address: prevData.address, maximumCapacity: prevData.maximumCapacity }));
      break;
    }
  }, [type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      setImageDescription(file.name);
    }
  };

  const handleTypeChange = (selectedType: Type) => {
    setType(selectedType);
    setFormData(prevData => ({ ...prevData, type: selectedType }));
  };

  const handleTagClick = (tag: ITag) => {
    const { tags } = formData;
    if (tags.some(t => t.id === tag.id)) {
      setFormData({
        ...formData,
        tags: tags.filter(t => t.id !== tag.id),
      });
    } else if (tags.length < MAX_TAGS) {
      setFormData({
        ...formData,
        tags: [...tags, tag],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const startsAtIso = convertToISO8601WithUTC(formData.startsAt);
    const endsAtIso = convertToISO8601WithUTC(formData.endsAt);

    const lectureData: Partial<ILectureDetail> = {
      title: formData.title,
      lecturer: formData.lecturer,
      description: formData.description,
      startsAt: startsAtIso,
      endsAt: endsAtIso,
      type: formData.type,
      url: formData.url || undefined,
      address: formData.address || undefined,
      tags: formData.tags, 
      maximumCapacity: formData.maximumCapacity ? Number(formData.maximumCapacity) : undefined,
    };

    console.log("Sending data:", lectureData);

    try {
      await updateLecture(lecture.id.toString(), lectureData as ILectureDetail);

      if (imageFile) {
        await uploadImage(lecture.id.toString(), imageFile, imageDescription); 
      }

      onClose();
      navigate(0);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(`Erro ao atualizar a palestra: ${error.response?.data?.message || error.message}`);
      } else {
        setError(`Erro desconhecido: ${error}`);
      }
    }
  };


  return (
    <>
      <ErrorNotification error={error} />
      <form onSubmit={handleSubmit} className="p-4 flex flex-col space-y-6">
        <div className="flex space-x-4">
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Título da Palestra"
            width="50%"
          />
          <Input
            type="text"
            name="lecturer"
            value={formData.lecturer}
            onChange={handleInputChange}
            placeholder="Palestrante"
            width="50%"
          />
        </div>

        <div className="flex flex-col">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Descrição"
            className="p-2 border border-gray-300 rounded-md focus:outline-none"
            rows={4}
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <p>Horário e data de início:</p>
            <Input
              type="datetime-local"
              name="startsAt"
              value={formData.startsAt}
              onChange={handleInputChange}
              placeholder="Início"
            />
          </div>
  
          <div className="flex flex-col w-1/2">
            <p>Horário e data de término:</p>
            <Input
              type="datetime-local"
              name="endsAt"
              value={formData.endsAt}
              onChange={handleInputChange}
              placeholder="Fim"
            />
          </div>
        </div>
  

        <div className="flex space-x-4 justify-center">
          <div
            className={`p-4 border rounded-md cursor-pointer flex-1 text-center ${type === Type.HYBRID ? "border-purple-500 bg-purple-100" : "border-gray-300"}`}
            onClick={() => handleTypeChange(Type.HYBRID)}
          >
            Híbrido
          </div>
          <div
            className={`p-4 border rounded-md cursor-pointer flex-1 text-center ${type === Type.ONLINE ? "border-purple-500 bg-purple-100" : "border-gray-300"}`}
            onClick={() => handleTypeChange(Type.ONLINE)}
          >
            Online
          </div>
          <div
            className={`p-4 border rounded-md cursor-pointer flex-1 text-center ${type === Type.PRESENTIAL ? "border-purple-500 bg-purple-100" : "border-gray-300"}`}
            onClick={() => handleTypeChange(Type.PRESENTIAL)}
          >
            Presencial
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {type === Type.HYBRID && (
            <>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Endereço do Local"
                width="100%"
              />
              <Input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="URL da Live"
                width="100%"
              />
              <Input
                type="number"
                name="maximumCapacity"
                value={formData.maximumCapacity}
                onChange={handleInputChange}
                placeholder="Número máximo de participantes"
                width="100%"
              />
            </>
          )}

          {type === Type.ONLINE && (
            <Input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="URL da Live"
              width="100%"
            />
          )}

          {type === Type.PRESENTIAL && (
            <>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Endereço do Local"
                width="100%"
              />
              <Input
                type="number"
                name="maximumCapacity"
                value={formData.maximumCapacity}
                onChange={handleInputChange}
                placeholder="Número máximo de participantes"
                width="100%"
              />
            </>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="fileInput" className="mb-2">
              Escolha uma Imagem de capa para Palestra:
          </label>
          <input
            id="fileInput"
            type="file"
            name="file"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <div
                key={tag.id}
                className={`px-3 py-1 border rounded-full cursor-pointer ${
                  formData.tags.some(t => t.id === tag.id) ? "bg-gradient-to-br from-[#861efd] to-[#2a27d6] text-white" : "bg-gray-200"
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-[80%] mx-auto" text="Salvar Atualizações"/>
      </form>
    </>
  );
};

export default LectureFormUpdate;
