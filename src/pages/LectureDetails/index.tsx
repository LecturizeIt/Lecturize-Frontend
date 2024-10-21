import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteLecture, fetchLectureById, fetchLectureParticipants, participateInLecture, unParticipateInLecture } from "../../api/lecture";
import Navbar from "../../components/Navbar/Navbar.component";
import Footer from "../../components/Footer/Footer.component";
import { ErrorNotification } from "../../ui/ErrorNotification/ErrorNotification.ui";
import { dateFormatted } from "../../utils/lib/date.utils";
import { renderIfNotEmpty } from "../../utils/lib/renderIfNotEmpty.utils";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "../../ui/Modal/Modal.ui";
import { useMemo, useState } from "react";
import LectureFormUpdate from "../../components/LectureFormUpdate/LectureFormUpdate.component";
import { SuccessNotification } from "../../ui/SucessNotification/SucessNotification.ui";
import { ILectureDetail } from "../../domain/models/lecture.model";
import LoadingSpinner from "../../ui/Loading/Loading.ui";
import MectricsSection from "../../components/MetricsSection/MetricsSection.component";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";

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

  const { data: participants, refetch} = useQuery({
    queryKey: ["lectureParticipants", id],
    queryFn: () => fetchLectureParticipants(Number(id)),
    enabled: !!id,
  });

  const isParticipating = useMemo(() => {
    return participants?.some(participant => participant.id === user?.id);
  }, [participants, user]);


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
      refetch();
      queryClient.invalidateQueries({ queryKey: ["lecture", id] });
      setSuccessMessage("Você participou da palestra com sucesso!");
    },
    onError: (error) => {
      setErrorMessage(`Não é possivel participar dessa palestra. ERRO: ${error}`);
    },
  });

  const unParticipateMutation = useMutation({
    mutationFn: () => unParticipateInLecture(id as string),
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["lecture", id] });
      setSuccessMessage("Você saiu da palestra com sucesso!");
    },
    onError: (error) => {
      setErrorMessage(`Não foi possível sair da palestra. ERRO: ${error}`);
    },
  });

  const handleParticipate = () => {
    if (!user) {
      alert("Você precisa estar logado para participar.");
      return;
    }
    participateMutation.mutate();
  };

  const handleUnparticipate = () => {
    if (!user) {
      alert("Você precisa estar logado para sair da palestra.");
      return;
    }
    unParticipateMutation.mutate();
  };

  type LectureStatus = "Agendada" | "Finalizada" | "Cancelada" | "Em andamento";


  const getStatusBgColor = (status: LectureStatus) => {
    switch (status) {
    case "Agendada":
      return "bg-blue-500"; 
    case "Finalizada":
      return "bg-green-500"; 
    case "Cancelada":
      return "bg-red-500"; 
    case "Em andamento":
      return "bg-yellow-500"; 
    default:
      return "bg-gray-200"; 
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorNotification error="Erro ao carregar detalhes de palestra" />;

  if (!lecture) return <p>Detalhes da palestra não encontrados.</p>;


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 gap-4">
        <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">

          <img className="object-cover w-full h-64 rounded-lg mb-4" src={lecture.imageUrl} alt="Imagem de capa da palestra"/>
      
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
            <p className="text-lg inline-block text-gray-700 mb-2 " >
              <strong>Status:</strong> <span className={`rounded-2xl p-2 text-white font-bold ${getStatusBgColor(lecture?.status as LectureStatus)}`}>{lecture?.status}</span>
            </p>
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
            <p className="text-lg text-gray-700"><strong>Organizador:</strong> {lecture?.organizer.username}</p>
          ))}

          <div className="flex justify-between">
            <div>
              {user?.email === lecture?.organizer.email && (
                <>
                  <button
                    onClick={handleDelete}
                    className="mt-2 bg-red-500 text-white font-bold p-2  rounded hover:bg-red-600 duration-300 hover:scale-105"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button><button
                    onClick={handleOpenEditModal}
                    className="mt-2 bg-blue-500 text-white font-bold p-2  rounded hover:bg-blue-600 duration-300 hover:scale-105 ml-2"
                  >
                    <PencilSquareIcon className="h-6 2-6" />
                  </button>
                </>
              )}
            </div>

            <div>
              {lecture?.status === "Finalizada" || lecture?.status === "Cancelada" ? null : (
                isParticipating ? (
                  <button
                    onClick={handleUnparticipate}
                    className="mt-2 ml-2 bg-red-500 text-white font-bold p-2 rounded hover:bg-red-600 duration-300 hover:scale-105"
                  >
          Sair da palestra
                  </button>
                ) : (
                  <button
                    onClick={handleParticipate}
                    className="mt-2 ml-2 bg-green-500 text-white font-bold p-2 rounded hover:bg-green-600 duration-300 hover:scale-105"
                  >
          Participar
                  </button>
                )
              )}
            </div>
          </div>

          {isEditModalOpen && (
            <Modal onClose={handleCloseEditModal}>
              <LectureFormUpdate lecture={lecture} onClose={handleCloseEditModal} />
            </Modal>
          )}

        </div>
        {user?.email === lecture?.organizer.email &&(
          <>
            <MectricsSection user={user} lecture={lecture}/>
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