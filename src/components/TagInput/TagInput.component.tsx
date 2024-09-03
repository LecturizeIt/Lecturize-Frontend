import { useState } from "react";
import { TagData } from "../TagData/TagData.component";

const TagInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTags = () => {
    const newTags = inputValue.split(",").map(tag => tag.trim()).filter(tag => tag);
    setTags(prevTags => [...new Set([...prevTags, ...newTags])]);
    setInputValue("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTags();
    }
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Tags"
        className="p-2 border border-gray-300 rounded-md focus:outline-none"
      />
      <p className="font-extralight text-sm mt-2">Digite as tags separadas por virgula e pressione Enter</p>
      <div className="flex flex-wrap mt-2">
        {tags.map((tag, index) => (
          <TagData
            key={index}
            dataSearch={tag}
            onRemove={() => handleRemoveTag(tag)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagInput;
