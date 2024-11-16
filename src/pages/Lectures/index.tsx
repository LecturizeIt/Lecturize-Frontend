import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer.component";
import ListCards from "../../components/ListCard/ListCard.component";
import Navbar from "../../components/Navbar/Navbar.component";
import { useLectures } from "../../hooks/useLectures";
import { fetchTags } from "../../api/tags"; 
import { ErrorNotification } from "../../ui/ErrorNotification/ErrorNotification.ui";
import LoadingSpinner from "../../ui/Loading/Loading.ui";
import { ITag } from "../../domain/models/tag.model";

function Lectures () {
  const { data: lectures, isLoading, isError } = useLectures();
  const navigate = useNavigate();
  const [availableTags, setAvailableTags] = useState<ITag[]>([]);
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]); 
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

  const handleTagClick = (tag: ITag) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.find(t => t.id === tag.id)) {
        return prevSelectedTags.filter((t) => t.id !== tag.id);
      } else if (prevSelectedTags.length < MAX_TAGS) {
        return [...prevSelectedTags, tag];
      }
      return prevSelectedTags;
    });
  };
  
  const filteredLectures = selectedTags.length > 0
    ? (lectures ?? []).filter((lecture) => {
      const lectureTags = lecture.tags as unknown as string[];
      return lectureTags.some((lectureTag: string) => 
        selectedTags.some((selectedTag) => selectedTag.name === lectureTag)
      );
    })
    : lectures ?? [];

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorNotification error="Erro ao carregar palestras" />;

  const handleLectureClick = (id: number) => {
    navigate(`/lectures/${id}`);
  };

  console.log("Palestras:", lectures);
  console.log("Tags selecionadas:", selectedTags);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow mt-14">
        <div className="max-w-8xl mx-auto p-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Nossas Palestras</h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Explore as palestras que oferecemos e descubra temas interessantes para expandir seus conhecimentos. Clique em uma palestra para saber mais.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {availableTags.map((tag) => (
              <div
                key={tag.id}
                className={`px-3 py-1 border rounded-full cursor-pointer ${
                  selectedTags.some(selectedTag => selectedTag.id === tag.id)
                    ? "bg-gradient-to-br from-[#861efd] to-[#2a27d6] text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag.name}
              </div>
            ))}
          </div>

          {filteredLectures.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              <ListCards
                lectures={filteredLectures}
                onCardClick={handleLectureClick}
              />
            </div>
          ) : (
            <p className="text-lg text-gray-600 text-center">Nenhuma palestra cadastrada no sistema.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Lectures;
