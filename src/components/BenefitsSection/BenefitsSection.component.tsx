import { AcademicCapIcon, AdjustmentsHorizontalIcon, ShareIcon } from "@heroicons/react/16/solid";

const BenefitsSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Por que usar a Lecturize It?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          
          <div className="text-center">
            <div className="h-16 w-16 bg-gradient-to-br from-[#861efd] to-[#2a27d6] rounded-full flex items-center justify-center mx-auto mb-4">
              <AcademicCapIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Organize com Facilidade</h3>
            <p className="text-gray-600">Mantenha suas palestras sempre organizadas.</p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 bg-gradient-to-br from-[#861efd] to-[#2a27d6] rounded-full flex items-center justify-center mx-auto mb-4">
              <AdjustmentsHorizontalIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalize Suas Palestras</h3>
            <p className="text-gray-600">Adapte as palestras conforme suas necessidades e preferências.</p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 bg-gradient-to-br from-[#861efd] to-[#2a27d6] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShareIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Compartilhamento Simples</h3>
            <p className="text-gray-600">Compartilhe palestras educativas com facilidade e rapidez.</p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
