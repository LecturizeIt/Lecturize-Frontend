import { useState } from "react";
import Input from "../../ui/Input/Input.ui";
import Button from "../../ui/Button/Button.ui";
import TagInput from "../TagInput/TagInput.component";


function LectureForm () {
  const [type, setType] = useState("ONLINE");

  const [formData, setFormData] = useState({
    title: "",
    lecturer: "",
    description: "",
    startsAt: "",
    endsAt: "",
    address: "",
    url: "",
    tags: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (selectedType: string) => {
    setType(selectedType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
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
            type === "HYBRID" ? "border-blue-500 bg-blue-100" : "border-gray-300"
          }`}
          onClick={() => handleTypeChange("HYBRID")}
        >
          Híbrido
        </div>
        <div
          className={`p-4 border rounded-md cursor-pointer flex-1 text-center ${
            type === "ONLINE" ? "border-blue-500 bg-blue-100" : "border-gray-300"
          }`}
          onClick={() => handleTypeChange("ONLINE")}
        >
          Online
        </div>
        <div
          className={`p-4 border rounded-md cursor-pointer flex-1 text-center ${
            type === "PRESENTIAL" ? "border-blue-500 bg-blue-100" : "border-gray-300"
          }`}
          onClick={() => handleTypeChange("PRESENTIAL")}
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
      <TagInput />

      <Button type="submit" text="Criar Palestra" />
    </form>
  );
}

export default LectureForm;
