import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Input from "../../ui/Input/Input.ui";
import Button from "../../ui/Button/Button.ui";
import { ILectureDetail } from "../../domain/models/lectureDetail.model";
import { updateLecture } from "../../api/lecture";
import { Type } from "../../domain/enums/type.enums";
import { convertToISO8601WithUTC } from "../../utils/lib/convertToISO8601WithUTC.utils";
import { fetchTags } from "../../api/tags";
import { ErrorNotification } from "../../ui/ErrorNotification/ErrorNotification.ui";
import { formatDateTimeForInput } from "../../utils/lib/date.utils";
import { useNavigate } from "react-router-dom";

interface ILectureFormUpdateProps {
  lecture: ILectureDetail;
  onClose: () => void;
}

const LectureFormUpdate: React.FC<ILectureFormUpdateProps> = ({ lecture, onClose }) => {
  const navigate = useNavigate();

  const [type, setType] = useState<Type>(lecture.type as Type);
  const [availableTags, setAvailableTags] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  const [formData, setFormData] = useState({
    title: lecture.title || "",
    lecturer: lecture.lecturer || "",
    description: lecture.description || "",
    startsAt: formatDateTimeForInput(lecture.startsAt),
    endsAt: formatDateTimeForInput(lecture.endsAt),
    address: lecture.address || "",
    url: lecture.url || "",
    type: lecture.type as Type,
    tags: lecture.tags.map(tag => tag.id) || [],
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

  const handleTypeChange = (selectedType: Type) => {
    setType(selectedType);
    setFormData(prevData => ({ ...prevData, type: selectedType }));
  };

  const handleTagClick = (tagId: number) => {
    setFormData(prevData => {
      const { tags } = prevData;
      if (tags.includes(tagId)) {
        return {
          ...prevData,
          tags: tags.filter(id => id !== tagId),
        };
      } else if (tags.length < MAX_TAGS) {
        return {
          ...prevData,
          tags: [...tags, tagId],
        };
      }
      return prevData;
    });
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
      tags: formData.tags.map(tagId => ({ id: tagId })), 
      maximumCapacity: formData.maximumCapacity ? Number(formData.maximumCapacity) : undefined,
    };

    console.log("Sending data:", lectureData);

    try {
      await updateLecture(lecture.id.toString(), lectureData as ILectureDetail);
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
          <Input
            type="datetime-local"
            name="startsAt"
            value={formData.startsAt}
            onChange={handleInputChange}
            placeholder="Início"
            width="50%"
          />
          <Input
            type="datetime-local"
            name="endsAt"
            value={formData.endsAt}
            onChange={handleInputChange}
            placeholder="Fim"
            width="50%"
          />
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
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <div
                key={tag.id}
                onClick={() => handleTagClick(tag.id)}
                className={`px-3 py-1 border rounded-full cursor-pointer ${
                  formData.tags.includes(tag.id) ? "bg-gradient-to-br from-[#861efd] to-[#2a27d6] text-white" : "bg-gray-200"
                }`}
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" text="Salvar Atualizações"/>
      </form>
    </>
  );
};

export default LectureFormUpdate;
