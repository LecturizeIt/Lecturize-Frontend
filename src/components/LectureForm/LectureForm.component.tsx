import { useState } from "react";
import Input from "../../ui/Input/Input.ui";
import Button from "../../ui/Button/Button.ui";
import { ILectureModel } from "../../domain/models/lecture.model";
import { createLecture } from "../../api/lecture";
import { Type } from "../../domain/enums/type.enums";
import { convertToISO8601WithUTC } from "../../utils/convertToISO8601WithUTC";

function LectureForm () {
  const [type, setType] = useState<Type>(Type.HYBRID);

  const [formData, setFormData] = useState({
    title: "",
    lecturer: "",
    description: "",
    startsAt: "",
    endsAt: "",
    address: "",
    url: "",
    type: Type.ONLINE
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (selectedType: Type) => {
    setType(selectedType);
    setFormData({ ...formData, type: selectedType });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const startsAtIso = convertToISO8601WithUTC(formData.startsAt);
    const endsAtIso = convertToISO8601WithUTC(formData.endsAt);

    const lectureData: ILectureModel = {
      ...formData,
      type: formData.type,
      startsAt: startsAtIso,
      endsAt: endsAtIso,
    };  

    console.log("lecture data: ", lectureData);

    try {
      await createLecture(lectureData);
      console.log("Palestra criada com sucesso");
    } catch (error) {
      console.error("Erro ao criar palestra:", error);
    }
  };

  return (
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
          className={`p-4 border rounded-md cursor-pointer flex-1 text-center ${
            type === "HYBRID" ? "border-purple-500 bg-purple-100" : "border-gray-300"
          }`}
          onClick={() => handleTypeChange(Type.HYBRID)}
        >
          Híbrido
        </div>
        <div
          className={`p-4 border rounded-md cursor-pointer flex-1 text-center ${
            type === "ONLINE" ? "border-purple-500 bg-purple-100" : "border-gray-300"
          }`}
          onClick={() => handleTypeChange(Type.ONLINE)}
        >
          Online
        </div>
        <div
          className={`p-4 border rounded-md cursor-pointer flex-1 text-center ${
            type === "PRESENTIAL" ? "border-purple-500 bg-purple-100" : "border-gray-300"
          }`}
          onClick={() => handleTypeChange(Type.PRESENTIAL)}
        >
          Presencial
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        {type === "HYBRID" && (
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
          </>
        )}

        {type === "ONLINE" && (
          <Input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder="URL da Live"
            width="100%"
          />
        )}

        {type === "PRESENTIAL" && (
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Endereço do Local"
            width="100%"
          />
        )}
      </div>

      <Button type="submit" text="Criar Palestra" />
    </form>
  );
}

export default LectureForm;