interface ITagData {
  dataSearch: string;
  onRemove: () => void;
}

export const TagData = ({ dataSearch, onRemove }: ITagData) => {
  return (
    <p className="pl-[15px] pr-[15px] p-[3px] text-white text-center font-semibold inline-block justify-around bg-gradient-to-br from-[#861efd] to-[#2a27d6] rounded-2xl mt-2 mr-2">
      {dataSearch}
      <button onClick={onRemove} className="ml-2" data-testid="close-btn-icon">
        X
      </button>
    </p>
  );
};
