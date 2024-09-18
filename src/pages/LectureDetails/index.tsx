import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteLecture, fetchLectureById, participateInLecture } from "../../api/lecture";
import { ILectureDetail } from "../../domain/models/lectureDetail.model";
import Navbar from "../../components/Navbar/Navbar.component";
import Footer from "../../components/Footer/Footer.component";
import { ErrorNotification } from "../../ui/ErrorNotification/ErrorNotification.ui";
import { dateFormatted } from "../../utils/lib/date.utils";
import { renderIfNotEmpty } from "../../utils/lib/renderIfNotEmpty.utils";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "../../ui/Modal/Modal.ui";
import { useState } from "react";
import LectureFormUpdate from "../../components/LectureFormUpdate/LectureFormUpdate.component";
import LectureParticipants from "../../components/LectureParticipants/LectureParticipants.component";
import { SuccessNotification } from "../../ui/SucessNotification/SucessNotification.ui";

function LectureDetails () {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditModalOpen, setEditModalOpen] = useState(false); 
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);


  const handleOpenEditModal = () => {
    setEditModalOpen(true); 
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false); 
  };

  const { data: lecture, isLoading, isError } = useQuery<ILectureDetail>({
    queryKey: ["lecture", id],
    queryFn: () => fetchLectureById(id as string),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteLecture(id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["lectures", id]});
      navigate("/lectures");
    }
  });

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja deletar esta palestra?")){
      deleteMutation.mutate();
    }
  };

  const participateMutation = useMutation({
    mutationFn: () => participateInLecture(id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecture", id] });
      setSuccessMessage("Você participou da palestra com sucesso!");
    },
    onError: (error) => {
      setErrorMessage(`Não é possivel participar dessa palestra. ERRO: ${error}`);
    },
  });


  const handleParticipate = () => {
    if (!user) {
      alert("Você precisa estar logado para participar.");
      return;
    }
    participateMutation.mutate();
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading lecture details...</p>;
  if (isError) return <ErrorNotification error="Erro ao carregar detalhes de palestra" />;

  if (!lecture) return <p>Detalhes da palestra não encontrados.</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 gap-4 bg-gray-100">
        <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{lecture?.title}</h1>
          
          {renderIfNotEmpty(lecture?.lecturer, () => (
            <p className="text-lg text-gray-700 mb-2"><strong>Palestrante:</strong> {lecture?.lecturer}</p>
          ))}

          {renderIfNotEmpty(lecture?.description, () => (
            <p className="text-lg text-gray-700 mb-2"><strong>Descrição:</strong> {lecture?.description}</p>
          ))}

          {renderIfNotEmpty(lecture?.startsAt, () => (
            <p className="text-lg text-gray-700 mb-2">
              <strong>Começo: </strong>
              <time title={dateFormatted(lecture?.startsAt)} dateTime={lecture?.startsAt || ""}>
                {dateFormatted(lecture?.startsAt)}
              </time>
            </p>
          ))}

          {renderIfNotEmpty(lecture?.endsAt, () => (
            <p className="text-lg text-gray-700 mb-2">
              <strong>Término: </strong>
              <time title={dateFormatted(lecture?.endsAt)} dateTime={lecture?.endsAt || ""}>
                {dateFormatted(lecture?.endsAt)}
              </time>
            </p>
          ))}

          {renderIfNotEmpty(lecture?.type, () => (
            <p className="text-lg text-gray-700 mb-2"><strong>Tipo da palestra:</strong> {lecture?.type}</p>
          ))}

          {renderIfNotEmpty(lecture?.status, () => (
            <p className="text-lg text-gray-700 mb-2"><strong>Status:</strong> {lecture?.status}</p>
          ))}

          {lecture?.url && (
            <p className="text-lg text-gray-700 mb-2">
              <strong>URL:</strong>{" "}
              <Link to={lecture.url} className="underline-animation text-[#861efd]">{lecture.url}</Link>
            </p>
          )}

          {lecture?.address &&(
            <p className="text-lg text-gray-700 mb-2">
              <strong>Endereço: </strong> 
              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lecture?.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-animation text-[#861efd]"
              >
                {lecture?.address}
              </Link>
            </p>
          )}

          {renderIfNotEmpty(lecture?.maximumCapacity, () => (
            <p className="text-lg text-gray-700 mb-2"><strong>Quantidade máxima de participantes: </strong> {lecture?.maximumCapacity}</p>
          ))}

          {renderIfNotEmpty(lecture?.tags?.length, () => (
            <ul className="list-disc list-inside mb-4">
              <strong>Tags:</strong>
              {lecture?.tags.map((tag, index) => ( 
                <li key={tag.id || index} className="text-lg text-gray-700">{tag.name}</li>
              ))}
            </ul>
          ))}

          {renderIfNotEmpty(lecture?.organizer.email, () => (
            <p className="text-lg text-gray-700"><strong>Organizador:</strong> {lecture?.organizer.email}</p>
          ))}

          {user?.email === lecture?.organizer.email && (
            <><button
              onClick={handleDelete}
              className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 duration-300"
            >
              Deletar Palestra
            </button><button
              onClick={handleOpenEditModal}
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 duration-300 ml-2"
            >
                Editar Palestra
            </button></>
          )}

          <button
            onClick={handleParticipate}
            className="mt-4 ml-2 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 duration-300"
          >
              Participar
          </button>

          {isEditModalOpen && (
            <Modal onClose={handleCloseEditModal}>
              <LectureFormUpdate lecture={lecture} onClose={handleCloseEditModal} />
            </Modal>
          )}

        </div>
        {user?.email === lecture?.organizer.email &&(
          <>
            <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
              <LectureParticipants lectureId={lecture.id} />
            </div>
          </>
        )}
      </div>
      <Footer />
      <ErrorNotification error={errorMessage} />
      <SuccessNotification message={successMessage} />
    </div>
  );
}

export default LectureDetails;