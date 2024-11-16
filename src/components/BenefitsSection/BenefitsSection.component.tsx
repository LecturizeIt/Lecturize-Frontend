import { AcademicCapIcon, AdjustmentsHorizontalIcon, ShareIcon } from "@heroicons/react/16/solid";

const BenefitsSection = () => {
  return (
    <section className="py-16 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Por que usar a Lecturize It?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          
          <div className="text-center bg-black/15 backdrop-blur-sm h-[350px] rounded-lg p-2">
            <div className="h-16 w-16 bg-gradient-to-br from-[#861efd] to-[#2a27d6] rounded-full flex items-center justify-center mx-auto mb-4 mt-[-35px]">
              <AcademicCapIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Organize com Facilidade</h3>
            <p className="text-white text-2xl font-semibold"> Nunca mais perca o fio da meada. Com a Lecturize It, suas palestras ficam armazenadas de forma clara e acessível, permitindo que você encontre e revise conteúdos rapidamente.</p>
          </div>

          <div className="text-center bg-black/15 backdrop-blur-sm h-[350px] rounded-lg p-2">
            <div className="h-16 w-16 bg-gradient-to-br from-[#861efd] to-[#2a27d6] rounded-full flex items-center justify-center mx-auto mb-4 mt-[-35px]">
              <AdjustmentsHorizontalIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalize Suas Palestras</h3>
            <p className="text-white text-2xl font-semibold">Dê o seu toque especial! Ajuste o conteúdo, adicione comentários ou destaque os pontos mais importantes para criar apresentações que realmente atendam às suas necessidades.</p>
          </div>

          <div className="text-center bg-black/15 backdrop-blur-sm h-[350px] rounded-lg p-2">
            <div className="h-16 w-16 bg-gradient-to-br from-[#861efd] to-[#2a27d6] rounded-full flex items-center justify-center mx-auto mb-4 mt-[-35px]">
              <ShareIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Compartilhamento Simples</h3>
            <p className="text-white text-2xl font-semibold">Facilite a troca de conhecimento! Compartilhe suas palestras com colegas, alunos ou parceiros de forma rápida e prática, otimizando o aprendizado e a colaboração.</p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
