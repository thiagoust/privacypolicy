import React from 'react';

// To keep the App component clean, we define the content component separately.
// This is good practice even if it's in the same file for a simple app.
const PrivacyPolicyContent: React.FC = () => {

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-lg">
      <header className="text-center mb-10 border-b pb-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">Política de Privacidade</h1>
        <p className="mt-2 text-sm text-slate-500">Última atualização: 22 de novembro de 2025</p>
      </header>

      <main className="text-slate-700 leading-relaxed space-y-8">
        <section>
          <p>
            A sua privacidade é importante para nós. É política do nosso aplicativo respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar. Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
          </p>
          <p className="mt-4">
            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. DADOS COLETADOS</h2>
          <div className="space-y-4 pl-4 border-l-4 border-teal-500">
            <div>
              <h3 className="font-semibold text-slate-700">Informações de Acesso e Perfil:</h3>
              <p>As contas de acesso ao portal são pré-criadas pela administração com base nos seus dados de associado(a) já existentes. Para acessar sua conta, você nos fornece suas credenciais de login (matrícula e data de nascimento), que são utilizadas unicamente para verificar sua identidade. Uma vez autenticado, o aplicativo exibe os dados do seu perfil (como nome, categoria, matrícula, data de admissão e foto) que já constam em nosso banco de dados. Não solicitamos informações para a criação de novas contas.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700">Informações Coletadas Automaticamente:</h3>
              <p>Quando você utiliza nosso aplicativo, podemos coletar automaticamente certas informações, incluindo seu endereço IP, tipo de navegador, sistema operacional, e informações sobre o uso do nosso serviço, como as páginas que você visita.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. COMO USAMOS SUAS INFORMAÇÕES</h2>
          <p>Utilizamos as informações que coletamos para diversos fins, incluindo:</p>
          <ul className="list-disc list-inside mt-4 pl-4 space-y-2">
            <li>Fornecer e gerenciar os serviços do portal, como processar suas solicitações (ex: reservas de churrasqueira) e enviar comunicações sobre o status dessas solicitações.</li>
            <li>Melhorar, personalizar e expandir nossos serviços.</li>
            <li>Entender e analisar como você utiliza nossos serviços.</li>
            <li>Comunicar com você para fins de atendimento ao cliente e para fornecer atualizações e outras informações essenciais sobre o serviço.</li>
            <li>Para fins de segurança, para prevenir fraudes e proteger nossos usuários.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. COMPARTILHAMENTO DE INFORMAÇÕES</h2>
          <p>Não compartilhamos suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:</p>
          <ul className="list-disc list-inside mt-4 pl-4 space-y-2">
            <li><strong>Com seu consentimento:</strong> Podemos compartilhar informações com o seu consentimento explícito.</li>
            <li><strong>Para cumprimento da lei:</strong> Podemos divulgar informações se formos obrigados por lei ou em resposta a solicitações válidas por autoridades públicas.</li>
            <li><strong>Provedores de serviço:</strong> Podemos compartilhar informações com empresas terceirizadas que nos auxiliam na operação do nosso aplicativo e na prestação de nossos serviços.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. SEGURANÇA DOS DADOS</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum sistema de segurança é impenetrável e não podemos garantir a segurança absoluta de suas informações.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. SEUS DIREITOS</h2>
          <p>
            Você tem o direito de acessar, corrigir ou excluir suas informações pessoais que mantemos. Para exercer esses direitos, entre em contato conosco através das informações fornecidas abaixo.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. PRIVACIDADE DE MENORES</h2>
          <p>
            O nosso serviço não se destina a menores de 16 anos. Não coletamos intencionalmente informações de identificação pessoal de menores de 16 anos. Se você é pai/mãe ou responsável e sabe que seu filho nos forneceu dados pessoais, entre em contato conosco. Se tomarmos conhecimento de que coletamos dados pessoais de menores de 16 anos sem verificação do consentimento dos pais, tomamos medidas para remover essas informações de nossos servidores.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. ALTERAÇÕES A ESTA POLÍTICA DE PRIVACIDADE</h2>
          <p>
            Podemos atualizar esta política de privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações publicando a nova política de privacidade nesta página. Aconselhamos que você revise esta política periodicamente para quaisquer alterações.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. CONTATO</h2>
          <p>
            Se tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco pelo e-mail: <a href="mailto:atendimento@afea-rj.org.br" className="text-teal-600 font-medium hover:text-teal-700 underline transition-colors">atendimento@afea-rj.org.br</a>.
          </p>
        </section>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 font-sans antialiased">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <PrivacyPolicyContent />
      </div>
    </div>
  );
};

export default App;