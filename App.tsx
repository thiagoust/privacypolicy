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
          <p className="mt-6 font-semibold text-slate-800 bg-teal-50 p-4 rounded-lg border border-teal-200">
            Ao marcar a caixa de seleção de concordância na tela de login e acessar o portal, você, na qualidade de associado titular, declara ter lido, compreendido e concordado com os Termos de Uso e com esta Política de Privacidade, estendendo essa concordância aos seus dependentes cadastrados.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. DADOS COLETADOS</h2>
          <div className="space-y-4 pl-4 border-l-4 border-teal-500">
            <div>
              <h3 className="font-semibold text-slate-700">Informações de Acesso e Perfil:</h3>
              <p>As contas de acesso ao portal são pré-criadas pela administração com base nos seus dados de associado(a) já existentes. Para acessar sua conta, você nos fornece suas credenciais de login (matrícula e data de nascimento), que são utilizadas unicamente para verificar sua identidade. Uma vez autenticado, o aplicativo exibe os dados do seu perfil (como nome, categoria, matrícula, data de admissão e foto) que já constam em nosso banco de dados. Não solicitamos informações para a criação de novas contas.</p>
              <p className="mt-2 text-sm text-slate-600 italic">
                Em caso de divergência na data de nascimento que impeça o seu acesso, o portal oferece uma ferramenta para que você solicite a correção. O associado titular também tem acesso à lista de seus dependentes cadastrados e pode solicitar a correção da data de nascimento dos mesmos. Esta informação é utilizada exclusivamente para a finalidade de autenticação e para diferenciar membros com a mesma matrícula (titulares e dependentes). A data de nascimento não é visível publicamente no portal.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700">Atualização de Dados de Contato (E-mail e Telefone):</h3>
              <p>O portal permite que você visualize e atualize diretamente seu endereço de e-mail e número de telefone cadastrados. Essas informações são gerenciadas pelo próprio associado, garantindo agilidade na manutenção dos seus dados de contato.</p>
              <p className="mt-2 text-sm text-slate-600 italic">
                Manter seu e-mail e telefone atualizados é essencial para receber notificações sobre reservas, avisos importantes da associação e respostas a solicitações de suporte.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700">Atualização de Foto para a Carteira Digital:</h3>
              <p>Sua carteira digital é inicialmente gerada com um avatar personalizado. Para fins de identificação e controle de acesso, você pode solicitar a atualização desta imagem por uma foto pessoal. A foto enviada pelo portal será analisada pela secretaria, que a comparará com a foto 3x4 arquivada em seu cadastro físico na associação para garantir a autenticidade.</p>
               <p className="mt-2 text-sm text-slate-600 italic">
                O acesso à sua carteira digital e às suas informações é estritamente individual e protegido por suas credenciais de login. Outros associados não têm acesso aos seus dados ou à sua foto.
              </p>
            </div>
             <div>
              <h3 className="font-semibold text-slate-700">Solicitação de Cadastro de Dependentes:</h3>
              <p>O associado titular pode, através do portal, solicitar a inclusão de seus dependentes (cônjuge, filhos, etc.). Este processo requer o fornecimento de dados pessoais do dependente, como nome completo e data de nascimento.</p>
               <p className="mt-2 text-sm text-slate-600 italic">
                Ao submeter a solicitação, o associado titular declara ser o responsável legal pelo dependente ou ter obtido o consentimento necessário para compartilhar tais informações com a AFEA. Esses dados serão utilizados exclusivamente para o cadastro do dependente no sistema da associação, permitindo-lhes o acesso e o usufruto dos serviços e instalações, de acordo com o estatuto.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700">Informações Coletadas Automaticamente:</h3>
              <p>Quando você utiliza nosso aplicativo, podemos coletar automaticamente certas informações, incluindo seu endereço IP, tipo de navegador, sistema operacional, e informações sobre o uso do nosso serviço, como as páginas que você visita.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. COMO USAMOS SUAS INFORMAÇÕES E BASES LEGAIS</h2>
          <p>Utilizamos as informações que coletamos para diversos fins, incluindo:</p>
          <ul className="list-disc list-inside mt-4 pl-4 space-y-2">
            <li>Fornecer e gerenciar os serviços do portal, como processar suas solicitações (ex: reservas de churrasqueira) e enviar comunicações sobre o status dessas solicitações.</li>
            <li>Melhorar, personalizar e expandir nossos serviços.</li>
            <li>Entender e analisar como você utiliza nossos serviços.</li>
            <li>Comunicar com você para fins de atendimento ao cliente e para fornecer atualizações e outras informações essenciais sobre o serviço.</li>
            <li>Para fins de segurança, para prevenir fraudes e proteger nossos usuários.</li>
          </ul>
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
             <p className="font-semibold text-slate-700">Para sermos transparentes, informamos as bases legais que nos permitem tratar seus dados:</p>
             <ul className="list-disc list-inside mt-2 pl-4 space-y-2 text-sm">
                <li><strong>Execução de Contrato:</strong> A maioria dos dados que utilizamos, como seu nome, matrícula e status de associado, são tratados para cumprir com nossas obrigações contratuais com você como membro da AFEA.</li>
                <li><strong>Consentimento:</strong> Em situações específicas, como o envio de uma nova foto ou a solicitação de uma reserva, tratamos os dados com base no seu consentimento, fornecido na página de login, antes de acessar o aplicativo.</li>
                <li><strong>Legítimo Interesse:</strong> Utilizamos dados de uso e navegação para melhorar nossos serviços, garantir a segurança e prevenir fraudes, sempre respeitando seus direitos e liberdades.</li>
                <li><strong>Obrigação Legal:</strong> Podemos tratar seus dados para cumprir com obrigações legais ou regulatórias.</li>
             </ul>
          </div>
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
          <p className="mt-4">
            Para reforçar a segurança do seu acesso, nosso sistema implementa uma camada adicional de proteção que vincula o seu dispositivo (celular, tablet ou computador) à sua matrícula. Esse mecanismo impede que um mesmo aparelho seja utilizado para acessar duas contas de associados diferentes, dificultando o compartilhamento de credenciais e o acesso não autorizado.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. PERÍODO DE RETENÇÃO DOS DADOS</h2>
           <p>
            Seus dados pessoais serão mantidos em nosso sistema enquanto você for um associado ativo da AFEA. Após o seu desligamento da associação, manteremos seus dados armazenados apenas pelos prazos legais necessários para cumprir obrigações fiscais, contábeis ou para defesa em processos judiciais. Após esses períodos, os dados serão eliminados de forma segura ou anonimizados.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. SEUS DIREITOS COMO TITULAR DOS DADOS</h2>
          <p>De acordo com a LGPD, você possui diversos direitos em relação aos seus dados, incluindo:</p>
          <ul className="list-disc list-inside mt-4 pl-4 space-y-2">
            <li><strong>Confirmação e Acesso:</strong> O direito de saber se tratamos seus dados e de acessá-los.</li>
            <li><strong>Correção:</strong> O direito de solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
            <li><strong>Anonimização, Bloqueio ou Eliminação:</strong> O direito de solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei.</li>
            <li><strong>Informação sobre Compartilhamento:</strong> O direito de saber com quais entidades públicas ou privadas compartilhamos seus dados.</li>
            <li><strong>Revogação do Consentimento:</strong> O direito de revogar o seu consentimento a qualquer momento.</li>
          </ul>
           <p className="mt-4">Para exercer qualquer um desses direitos, entre em contato conosco através do e-mail: <a href="mailto:atendimento@afea-rj.org.br" className="text-teal-600 font-medium hover:text-teal-700 underline transition-colors">atendimento@afea-rj.org.br</a>.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. PRIVACIDADE DE MENORES</h2>
          <p>
            O acesso direto ao nosso serviço através de login individual é restrito a maiores de 12 anos. Os dados de associados dependentes menores de 12 anos já constam em nosso sistema, sendo cadastrados pela administração no momento da inscrição do titular ou posteriormente a seu pedido, para que possam usufruir das dependências da associação. O aplicativo bloqueia ativamente o login individual para essa faixa etária. Não coletamos informações diretamente de menores, e o acesso às suas informações através do portal é controlado pelo associado titular.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. ALTERAÇÕES A ESTA POLÍTICA DE PRIVACIDADE</h2>
          <p>
            Podemos atualizar esta política de privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações publicando a nova política de privacidade nesta página. Aconselhamos que você revise esta política periodicamente para quaisquer alterações.
          </p>
        </section>

        <section>
           <h2 className="text-2xl font-semibold text-slate-800 mb-4">9. CONTROLADOR E ENCARREGADO DE DADOS (DPO)</h2>
           <div className="space-y-2 text-sm p-4 border-l-4 border-slate-300 bg-slate-50 rounded-r-lg">
             <p><strong>Controlador de Dados:</strong> A Associação Fluminense de Engenheiros e Arquitetos (AFEA), CNPJ nº 30.136.865/0001-40, com sede na Av. Roberto Silveira, 245 – Icaraí – Niterói- RJ, é a controladora dos seus dados pessoais no âmbito deste serviço.</p>
             <p><strong>Encarregado pela Proteção de Dados (DPO):</strong> Para qualquer dúvida sobre como seus dados são tratados ou para exercer seus direitos, você pode entrar em contato com nosso Encarregado de Dados através do e-mail: <a href="mailto:atendimento@afea-rj.org.br" className="text-teal-600 font-medium hover:text-teal-700 underline transition-colors">atendimento@afea-rj.org.br</a>.</p>
           </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">10. CONTATO</h2>
          <p>
            Se tiver alguma outra dúvida sobre esta Política de Privacidade, entre em contato conosco pelo e-mail: <a href="mailto:atendimento@afea-rj.org.br" className="text-teal-600 font-medium hover:text-teal-700 underline transition-colors">atendimento@afea-rj.org.br</a>.
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