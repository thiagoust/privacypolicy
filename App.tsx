import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Printer, 
  Copy, 
  Check, 
  UserCheck, 
  Mail, 
  Calendar, 
  Building, 
  ShieldAlert, 
  Database, 
  Lock, 
  Users, 
  FileText,
  Smartphone,
  ChevronDown,
  Info,
  Download,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'cadastral' | 'finalidade' | 'seguranca'>('all');
  
  // States for inline LGPD request generator
  const [showEmailHelper, setShowEmailHelper] = useState(false);
  const [requestType, setRequestType] = useState('access');
  const [userName, setUserName] = useState('');
  const [userRegistration, setUserRegistration] = useState('');

  // States for PDF download modal
  const [showPdfModal, setShowPdfModal] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const currentTab = activeTab;
    setActiveTab('all');
    setTimeout(() => {
      window.print();
      setActiveTab(currentTab);
    }, 150);
  };

  const handleDownloadPdf = () => {
    setShowPdfModal(true);
  };

  const handleConfirmDownloadPdf = () => {
    setShowPdfModal(false);
    const currentTab = activeTab;
    setActiveTab('all');
    setTimeout(() => {
      window.print();
      setActiveTab(currentTab);
    }, 150);
  };

  // Helper to highlight searched terms inside text
  const highlightText = (text: string) => {
    if (!searchTerm.trim()) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={index} className="bg-emerald-100 text-teal-950 font-semibold px-0.5 rounded">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Generator for DPO Mail contents
  const getMailContent = () => {
    const name = userName.trim() || '[Seu Nome Completo]';
    const reg = userRegistration.trim() || '[Sua Matrícula]';
    
    let subject = '';
    let body = '';

    switch (requestType) {
      case 'access':
        subject = `LGPD: Confirmação e Acesso aos Dados - ${name}`;
        body = `Prezado Encarregado de Dados (DPO) da AFEA,\n\nCom base nos meus direitos garantidos pela Lei Geral de Proteção de Dados (LGPD), solicito a confirmação de existência de tratamento e o acesso transparente aos meus dados pessoais cadastrados no Portal do Associado.\n\nMeus dados para identificação:\n- Nome Completo: ${name}\n- Matrícula: ${reg}\n\nAguardo retorno dentro do prazo legal.\n\nAtenciosamente,\n${name}`;
        break;
      case 'rectify':
        subject = `LGPD: Correção de Dados Cadastrais - ${name}`;
        body = `Prezado Encarregado de Dados (DPO) da AFEA,\n\nSolicito a correção de dados desatualizados ou incorretos em meu cadastro de associado.\n\nMeus dados para identificação:\n- Nome Completo: ${name}\n- Matrícula: ${reg}\n\nDados a serem corrigidos (descrever aqui):\n[Insira aqui as informações corretas, ex: Data de nascimento, E-mail ou Telefone]\n\nAtenciosamente,\n${name}`;
        break;
      case 'revoke':
        subject = `LGPD: Revogação de Consentimento de Uso do Portal - ${name}`;
        body = `Prezado Encarregado de Dados (DPO) da AFEA,\n\nDeclaro que gostaria de revogar o meu consentimento para o tratamento de dados no âmbito do Portal do Associado. Compreendo que esta solicitação resultará no encerramento da minha conta de acesso e na indisponibilidade da minha Carteira Digital do Associado.\n\nMeus dados para identificação:\n- Nome Completo: ${name}\n- Matrícula: ${reg}\n\nAtenciosamente,\n${name}`;
        break;
    }

    return { subject, body };
  };

  const mailInfo = getMailContent();
  const mailToUrl = `mailto:atendimento@afea-rj.org.br?subject=${encodeURIComponent(mailInfo.subject)}&body=${encodeURIComponent(mailInfo.body)}`;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased selection:bg-teal-600 selection:text-white pb-20">
      {/* Upper Brand Badge */}
      <div className="bg-teal-950 text-white py-3 px-4 border-b border-teal-800 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
          <span className="bg-teal-800 text-teal-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Documento Oficial
          </span>
          <p>Associação Fluminense de Engenheiros e Arquitetos (AFEA) — CNPJ nº 30.136.865/0001-40</p>
        </div>
      </div>

      {/* Main Single Column Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        
        {/* Document Header & Hero */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden mb-8">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-600 to-emerald-500"></div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 mb-6 border-b border-slate-100 gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-teal-50 text-teal-700 p-3.5 rounded-2xl border border-teal-100 shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Política de Privacidade
                </h1>
                <p className="text-slate-500 font-medium text-sm mt-1">
                  Portal do Associado &amp; Carteira Digital
                </p>
              </div>
            </div>
            
            <div className="md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Última Atualização</p>
              <p className="text-sm font-semibold text-slate-700">14 de julho de 2026</p>
              <span className="inline-block mt-1 bg-teal-50 text-teal-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider border border-teal-100">
                Versão 2.0 (Unificada LGPD)
              </span>
            </div>
          </div>

          {/* Quick Search & Utilities Grid */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4.5 w-4.5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Filtrar ou buscar termo nesta política..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-600 font-medium"
                >
                  Limpar
                </button>
              )}
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={handleDownloadPdf}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 border border-teal-700 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all cursor-pointer shadow-xs shrink-0"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Baixar PDF</span>
              </button>

              <button
                onClick={handlePrint}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer shadow-2xs shrink-0"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>Imprimir</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-all relative cursor-pointer shadow-2xs shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>Compartilhar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Categories Filter Tab */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'all' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Exibir Tudo
            </button>
            <button
              onClick={() => setActiveTab('cadastral')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'cadastral' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              1. Dados Coletados
            </button>
            <button
              onClick={() => setActiveTab('finalidade')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'finalidade' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              2. Finalidade &amp; Bases Legais
            </button>
            <button
              onClick={() => setActiveTab('seguranca')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'seguranca' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              4. Segurança &amp; Armazenamento
            </button>
          </div>

          {/* Introduction & Welcome Text */}
          <div className="mt-6 text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
            <p>
              {highlightText(
                "A Associação Fluminense de Engenheiros e Arquitetos (AFEA), CNPJ nº 30.136.865/0001-40, com sede na Av. Roberto Silveira, 245 – Icaraí – Niterói- RJ, valoriza a privacidade e a segurança das informações de seus associados. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos os seus dados pessoais no âmbito do Portal do Associado e na emissão da Carteira Digital do Associado."
              )}
            </p>
            <p>
              {highlightText(
                "A sua privacidade é importante para nós. É política do nosso aplicativo respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar. Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado."
              )}
            </p>
            <p>
              {highlightText(
                "Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados."
              )}
            </p>

            <div className="bg-teal-50/70 border border-teal-200 p-5 rounded-2xl flex items-start gap-4 mt-6">
              <UserCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed text-teal-950 font-medium">
                <strong className="block text-teal-900 font-bold mb-1 uppercase tracking-wider text-[11px]">Aceite Eletrônico &amp; Vinculação Legal:</strong>
                {highlightText(
                  "Ao marcar a caixa de seleção de concordância na tela de login e acessar o portal, você, na qualidade de associado titular, declara ter lido, compreendido e concordado com os Termos de Uso e com esta Política de Privacidade, estendendo essa concordância aos seus dependentes cadastrados."
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Unified Main Policy Content */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-12">
          
          {/* Section 1: Informações Coletadas */}
          <AnimatePresence mode="popLayout">
            {(activeTab === 'all' || activeTab === 'cadastral') && (
              <motion.section 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">1</div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">1. Informações que Coletamos</h2>
                </div>

                <p className="text-slate-600 text-sm">
                  {highlightText(
                    "Para fornecer os serviços do portal e emitir a Carteira Digital do Associado, coletamos e tratamos as seguintes categorias de dados pessoais, estruturadas de forma limpa e sem duplicidades para garantir transparência total:"
                  )}
                </p>

                <div className="space-y-4">
                  
                  {/* Category A */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <Database className="w-4.5 h-4.5 text-teal-600 shrink-0" />
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base">Dados Cadastrais e de Perfil</h3>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {highlightText(
                        "Nome completo, número de registro profissional (CREA/CAU), data de nascimento, categoria de associação, matrícula e data de admissão."
                      )}
                    </p>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 text-xs text-slate-600 space-y-2 shadow-2xs">
                      <p>
                        <strong>Origem e Autenticação de Acesso:</strong> {highlightText(
                          "As contas de acesso ao portal são pré-criadas pela administração com base nos seus dados de associado(a) já existentes. Para acessar sua conta, você nos fornece suas credenciais de login (matrícula e data de nascimento), que são utilizadas unicamente para verificar sua identidade. Uma vez autenticado, o aplicativo exibe os dados do seu perfil (como nome, categoria, matrícula, data de admissão e foto) que já constam em nosso banco de dados. Não solicitamos informações para a criação de novas contas."
                        )}
                      </p>
                      <p className="italic text-slate-500 pt-1.5 border-t border-slate-100">
                        {highlightText(
                          "Correções de Acesso: Em caso de divergência na data de nascimento que impeça o seu acesso, o portal oferece uma ferramenta para que você solicite a correção. O associado titular também tem acesso à lista de seus dependentes cadastrados e pode solicitar a correção da data de nascimento dos mesmos. Esta informação é utilizada exclusivamente para a finalidade de autenticação e para diferenciar membros com a mesma matrícula (titulares e dependentes). A data de nascimento não é visível publicamente no portal."
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Category B */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="w-4.5 h-4.5 text-teal-600 shrink-0" />
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base">Dados de Contato</h3>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {highlightText(
                        "Endereço de e-mail e número de telefone (celular)."
                      )}
                    </p>
                    <p className="text-xs text-slate-500 italic bg-white p-3 rounded-xl border border-slate-200/60">
                      {highlightText(
                        "Atualização Direta: O portal permite que você visualize e atualize diretamente seu endereço de e-mail e número de telefone cadastrados. Essas informações são gerenciadas pelo próprio associado, garantindo agilidade na manutenção dos seus dados de contato. Manter seu e-mail e telefone atualizados é essencial para receber notificações sobre reservas, avisos importantes da associação e respostas a solicitações de suporte."
                      )}
                    </p>
                  </div>

                  {/* Category C */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <UserCheck className="w-4.5 h-4.5 text-teal-600 shrink-0" />
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base">Dados de Identificação Visual (Carteira Digital)</h3>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {highlightText(
                        "Foto de perfil (enviada diretamente pelo usuário ou capturada para fins de identificação na carteira digital)."
                      )}
                    </p>
                    <p className="text-xs text-slate-500 italic bg-white p-3 rounded-xl border border-slate-200/60">
                      {highlightText(
                        "Validação pela Secretaria: Sua carteira digital é inicialmente gerada com um avatar personalizado. Para fins de identificação e controle de acesso, você pode solicitar a atualização desta imagem por uma foto pessoal. A foto enviada pelo portal será analisada pela secretaria, que a comparará com a foto 3x4 arquivada em seu cadastro físico na associação para garantir a autenticidade. O acesso à sua carteira digital e às suas informações é estritamente individual e protegido por suas credenciais de login. Outros associados não têm acesso aos seus dados ou à sua foto."
                      )}
                    </p>
                  </div>

                  {/* Category D */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4.5 h-4.5 text-teal-600 shrink-0" />
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base">Dados de Dependentes</h3>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {highlightText(
                        "Nome completo, parentesco e data de nascimento dos dependentes (cadastrados mediante solicitação do associado titular)."
                      )}
                    </p>
                    <p className="text-xs text-slate-500 italic bg-white p-3 rounded-xl border border-slate-200/60">
                      {highlightText(
                        "Termos para Dependentes: O associado titular pode, através do portal, solicitar a inclusão de seus dependentes (cônjuge, filhos, etc.). Ao submeter a solicitação, o associado titular declara ser o responsável legal pelo dependente ou ter obtido o consentimento necessário para compartilhar tais informações com a AFEA. Esses dados serão utilizados exclusivamente para o cadastro do dependente no sistema da associação, permitindo-lhes o acesso e o usufruto dos serviços e instalações, de acordo com o estatuto."
                      )}
                    </p>
                  </div>

                  {/* Category E */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4.5 h-4.5 text-teal-600 shrink-0" />
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base">Registros de Acesso e Coletas Automáticas</h3>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {highlightText(
                        "Endereço IP, tipo de navegador, sistema operacional, data e hora de acesso, termos de aceite assinados digitalmente, e informações de navegação sobre o uso do nosso serviço (como páginas visitadas)."
                      )}
                    </p>
                  </div>

                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Section 2: Finalidade do Tratamento & Bases Legais */}
          <AnimatePresence mode="popLayout">
            {(activeTab === 'all' || activeTab === 'finalidade') && (
              <motion.section 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">2</div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">2. Finalidade do Tratamento de Dados &amp; Bases Legais</h2>
                </div>

                <p className="text-slate-600 text-sm">
                  {highlightText(
                    "Tratamos os seus dados pessoais em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD) exclusivamente para as finalidades descritas a seguir:"
                  )}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-100 bg-[#fbfdfd] hover:border-teal-100 transition-all">
                    <h4 className="font-bold text-teal-900 text-xs uppercase tracking-wider">A. Emissão da Carteira Digital</h4>
                    <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                      {highlightText(
                        "Identificação e validação segura e imediata do associado titular e seus dependentes cadastrados nas dependências da AFEA e em parceiros conveniados."
                      )}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-100 bg-[#fbfdfd] hover:border-teal-100 transition-all">
                    <h4 className="font-bold text-teal-900 text-xs uppercase tracking-wider">B. Prestação de Serviços do Portal</h4>
                    <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                      {highlightText(
                        "Processamento de reservas de churrasqueiras, gerenciamento administrativo de atualizações cadastrais efetuadas pelos próprios membros, e envio de avisos oficiais importantes."
                      )}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-100 bg-[#fbfdfd] hover:border-teal-100 transition-all">
                    <h4 className="font-bold text-teal-900 text-xs uppercase tracking-wider">C. Segurança, Integridade e Vínculo de Dispositivos</h4>
                    <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                      {highlightText(
                        "Prevenção ativa a fraudes e acessos indevidos. Nosso sistema implementa uma camada adicional de proteção que vincula o seu dispositivo (celular, tablet ou computador) à sua matrícula. Esse mecanismo impede que um mesmo aparelho seja utilizado para acessar duas contas de associados diferentes, dificultando o compartilhamento inadequado de credenciais."
                      )}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-100 bg-[#fbfdfd] hover:border-teal-100 transition-all">
                    <h4 className="font-bold text-teal-900 text-xs uppercase tracking-wider">D. Obrigações Legais e de Auditoria</h4>
                    <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                      {highlightText(
                        "Retenção de logs de acesso e de conexões para auditoria de sistemas, de acordo com o exigido pela Legislação Federal (incluindo o Marco Civil da Internet)."
                      )}
                    </p>
                  </div>
                </div>

                {/* Bases Legais (original content expanded & unified) */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm">Bases Legais de Tratamento:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                      <span className="font-bold text-teal-800 block mb-1">Execução de Contrato:</span>
                      <p className="text-slate-600 leading-relaxed">
                        {highlightText(
                          "A maioria dos dados que utilizamos (nome, matrícula e status de associado) são tratados para viabilizar o seu vínculo associativo e executar nossas obrigações estatutárias com você."
                        )}
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                      <span className="font-bold text-teal-800 block mb-1">Consentimento:</span>
                      <p className="text-slate-600 leading-relaxed">
                        {highlightText(
                          "Em ações proativas específicas, como envio de nova foto pessoal, inclusão voluntária de dependentes ou requisições de reservas de churrasqueira, tratamos dados com base no seu consentimento."
                        )}
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                      <span className="font-bold text-teal-800 block mb-1">Legítimo Interesse:</span>
                      <p className="text-slate-600 leading-relaxed">
                        {highlightText(
                          "Utilizamos logs de rede e navegação para auditorias de segurança lógica do portal, prevenção de invasões cibernéticas e melhorias de usabilidade tecnológica."
                        )}
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                      <span className="font-bold text-teal-800 block mb-1">Obrigação Legal:</span>
                      <p className="text-slate-600 leading-relaxed">
                        {highlightText(
                          "Tratamento e guarda de informações necessárias para dar cumprimento a obrigações legais, fiscais, regulatórias ou ordens judiciais específicas."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Section 3: Compartilhamento e Armazenamento dos Dados */}
          <AnimatePresence mode="popLayout">
            {(activeTab === 'all' || activeTab === 'seguranca') && (
              <motion.section 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">3</div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">3. Compartilhamento e Armazenamento dos Dados</h2>
                </div>

                <p className="text-slate-700 leading-relaxed text-sm">
                  {highlightText(
                    "Os dados pessoais dos associados são armazenados em ambiente de nuvem seguro, estruturado e com confidencialidade garantida por contratos rigorosos:"
                  )}
                </p>

                <div className="space-y-3 pl-1 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-2"></span>
                    <p>
                      <strong>Sem Fins Comerciais:</strong> {highlightText(
                        "A AFEA não comercializa, aluga, troca ou compartilha os seus dados pessoais com terceiros para fins de marketing, propaganda ou campanhas publicitárias externas."
                      )}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-2"></span>
                    <p>
                      <strong>Provedores de Infraestrutura:</strong> {highlightText(
                        "Os dados podem ser processados e armazenados por ferramentas de nuvem parceiras estruturadas (como Google Firebase para autenticação e banco de dados ágil, e serviços internos do Google Drive ou Planilhas para fins de cadastros administrativos), que mantêm rígidos padrões internacionais de segurança e criptografia de dados."
                      )}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-2"></span>
                    <p>
                      <strong>Provedores de Serviços de TI:</strong> {highlightText(
                        "Compartilhamento restrito a empresas contratadas para suporte tecnológico e manutenção lógica do portal, as quais atuam estritamente como operadoras e sob comando direto da associação."
                      )}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-2"></span>
                    <p>
                      <strong>Cumprimento da Lei:</strong> {highlightText(
                        "Divulgação de informações apenas nas circunstâncias em que formos obrigados por leis federais ou por força de mandados e decisões judiciais válidas de autoridades competentes."
                      )}
                    </p>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Section 4: Segurança da Informação */}
          <AnimatePresence mode="popLayout">
            {(activeTab === 'all' || activeTab === 'seguranca') && (
              <motion.section 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">4</div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">4. Segurança da Informação</h2>
                </div>

                <p className="text-slate-700 leading-relaxed text-sm">
                  {highlightText(
                    "Adotamos medidas técnicas, administrativas e organizacionais para proteger seus dados pessoais contra acessos não autorizados, perda, destruição, vazamento ou alteração ilegal, incluindo:"
                  )}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-600">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Criptografia na transmissão (SSL/TLS ativo)</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Controle estrito de privilégios de acesso administrativo</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Geração de chaves criptográficas de autenticação para assinaturas digitais</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Bloqueio de logins simultâneos em aparelhos não autorizados</span>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Section 5: Seus Direitos (LGPD) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">5</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">5. Seus Direitos (LGPD)</h2>
            </div>

            <p className="text-slate-700 leading-relaxed text-sm">
              {highlightText(
                "Como titular de dados pessoais, você pode exercer os direitos previstos na LGPD a qualquer momento, de forma simplificada e gratuita, entrando em contato direto com a secretaria da AFEA para solicitar:"
              )}
            </p>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                <span><strong>Confirmação de Existência de Tratamento:</strong> Direito de saber se tratamos seus dados pessoais.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                <span><strong>Direito de Acesso:</strong> Direito de visualizar e obter relatórios sobre seus dados pessoais cadastrados.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                <span><strong>Correção de Dados:</strong> Retificação de informações inexatas, incompletas ou desatualizadas.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                <span><strong>Anonimização, Bloqueio ou Eliminação:</strong> Direito de suspender ou requerer a exclusão de dados desnecessários ou tratados de forma ilícita.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                <span><strong>Revogação do Consentimento:</strong> Solicitar a revogação de consentimentos concedidos anteriormente (isso implicará na imediata desativação da sua conta de acesso digital e na indisponibilidade da sua Carteira Digital).</span>
              </div>
            </div>

            {/* Inlined Elegant LGPD Request Email Tool (instead of a bulky sidebar widget) */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 mt-6 space-y-4">
              <button 
                onClick={() => setShowEmailHelper(!showEmailHelper)}
                className="w-full flex items-center justify-between font-bold text-slate-800 text-sm hover:text-teal-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4.5 h-4.5 text-teal-600" />
                  <span>Assistente de Envio de Solicitação Legal (DPO)</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${showEmailHelper ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showEmailHelper && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-4 pt-4 border-t border-slate-200/60"
                  >
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Preencha os campos abaixo para gerar um e-mail pré-formatado que poderá ser enviado diretamente ao Encarregado de Proteção de Dados (DPO) da AFEA.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Seu Nome Completo</label>
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Ex: Carlos Eduardo de Souza"
                          className="w-full text-xs px-3.5 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-hidden transition-all bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Número de Matrícula</label>
                        <input
                          type="text"
                          value={userRegistration}
                          onChange={(e) => setUserRegistration(e.target.value)}
                          placeholder="Ex: 8540-T"
                          className="w-full text-xs px-3.5 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-hidden transition-all bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tipo de Requisição Legal</label>
                      <select
                        value={requestType}
                        onChange={(e) => setRequestType(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-hidden transition-all bg-white text-slate-700 font-medium"
                      >
                        <option value="access">Confirmar Existência &amp; Acessar Meus Dados</option>
                        <option value="rectify">Corrigir Informações Cadastrais Desatualizadas</option>
                        <option value="revoke">Revogar Meu Consentimento (Encerramento do Portal)</option>
                      </select>
                    </div>

                    {/* Compact E-mail Draft Preview */}
                    <div className="bg-white p-3 border border-slate-200 rounded-xl space-y-1.5 font-mono text-[11px] text-slate-600 max-h-36 overflow-y-auto shadow-2xs">
                      <div className="border-b pb-1 font-bold text-slate-800">Assunto: <span className="font-normal text-slate-600">{mailInfo.subject}</span></div>
                      <div className="whitespace-pre-wrap leading-relaxed pt-1">{mailInfo.body}</div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <p className="text-[10px] text-slate-400 max-w-sm">
                        O botão ao lado abrirá seu aplicativo de e-mail padrão já preenchido com destinatário <strong className="text-slate-600">atendimento@afea-rj.org.br</strong>.
                      </p>
                      <a
                        href={mailToUrl}
                        className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Abrir Cliente de E-mail</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Section 6: Retenção de Dados */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">6</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">6. Retenção de Dados</h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm">
              {highlightText(
                "Os seus dados cadastrais e registros de uso são mantidos e armazenados em nossos servidores enquanto você mantiver seu vínculo associativo ativo junto à AFEA. Após o eventual desligamento ou desfiliação de membro, reteremos as informações apenas pelos períodos estritamente necessários para o cumprimento de obrigações contábeis, tributárias, legais, regulatórias ou para fins de exercício regular de direitos em processos judiciais e auditorias internas."
              )}
            </p>
          </section>

          {/* Section 7: Privacidade de Menores */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">7</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">7. Privacidade de Menores</h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm">
              {highlightText(
                "O login individual e acesso direto ao aplicativo é estritamente restrito a maiores de 12 anos de idade. Informações cadastrais de menores dependentes com faixa etária inferior são de responsabilidade do associado titular e já constam originalmente no cadastro do sistema administrativo principal para viabilizar o livre acesso e usufruto das dependências físicas da associação. Bloqueamos ativamente a criação de contas de acessos autônomas para essa faixa etária."
              )}
            </p>
          </section>

          {/* Section 8: Alterações a esta Política de Privacidade */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">8</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">8. Alterações a esta Política de Privacidade</h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm">
              {highlightText(
                "Reservamos o direito de atualizar esta Política de Privacidade periodicamente para refletir melhorias técnicas, adequações fiscais ou mudanças em legislações federais. Notificaremos você sobre qualquer alteração importante publicando a nova versão diretamente nesta página do portal. Aconselhamos a revisão regular deste termo."
              )}
            </p>
          </section>

          {/* Section 9: Controlador e Encarregado de Dados (DPO) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">9</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">9. Controlador e Encarregado de Dados (DPO)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex gap-3.5 items-start">
                <Building className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">Controlador de Dados</h4>
                  <p className="text-slate-700 leading-relaxed">
                    <strong>Associação Fluminense de Engenheiros e Arquitetos (AFEA)</strong>
                    <br />CNPJ nº 30.136.865/0001-40
                    <br />Sede: Av. Roberto Silveira, 245 – Icaraí – Niterói- RJ
                  </p>
                </div>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex gap-3.5 items-start">
                <Mail className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">Encarregado pelo Tratamento (DPO)</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Para qualquer esclarecimento, relatórios de dados ou solicitações, fale diretamente com o Encarregado de Dados pelo e-mail:
                    <br />
                    <a href="mailto:atendimento@afea-rj.org.br" className="text-teal-600 font-bold hover:text-teal-700 underline transition-colors block mt-1">
                      atendimento@afea-rj.org.br
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 10: Contato */}
          <section className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">10. Contato Geral</h3>
            <p className="text-slate-700 leading-relaxed text-sm">
              Se você tiver qualquer outra dúvida sobre esta Política de Privacidade ou sobre as práticas adotadas no Portal do Associado, fale conosco pelo canal oficial de suporte administrativo: <a href="mailto:atendimento@afea-rj.org.br" className="text-teal-600 font-semibold hover:text-teal-700 underline transition-colors">atendimento@afea-rj.org.br</a>.
            </p>
          </section>

        </div>

        {/* Footer Brand Logo Block */}
        <div className="text-center mt-12 space-y-2">
          <div className="flex items-center justify-center space-x-2 text-slate-400">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span className="font-bold text-slate-600 text-sm">AFEA Proteção de Dados</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Desenvolvido em total conformidade com a Lei Federal nº 13.709/2018 (Lei Geral de Proteção de Dados).
          </p>
        </div>

      </div>

      {/* PDF Download Guide Modal */}
      <AnimatePresence>
        {showPdfModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPdfModal(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-md w-full p-6 relative overflow-hidden space-y-5 z-10"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-600 to-emerald-500"></div>
              
              {/* Close Button */}
              <button 
                onClick={() => setShowPdfModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-full transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-4">
                <div className="bg-teal-50 text-teal-700 p-3 rounded-2xl border border-teal-100 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">Gerar PDF Oficial</h3>
                  <p className="text-slate-500 text-xs">
                    Portal do Associado &amp; Carteira Digital AFEA
                  </p>
                </div>
              </div>

              <div className="text-slate-600 text-sm leading-relaxed space-y-3.5">
                <p>
                  Para baixar este termo em formato <strong>PDF oficial</strong> de alta resolução e com textos vetoriais nítidos (permitindo busca e seleção):
                </p>
                
                <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                    <p>Clique no botão <strong>"Confirmar e Gerar"</strong> abaixo.</p>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <p>No campo <strong>Destino / Impressora</strong>, selecione a opção <strong>"Salvar como PDF"</strong> (ou <em>"Save as PDF"</em>).</p>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                    <p>Escolha o local de salvamento e clique em <strong>Salvar</strong>.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-amber-50 text-amber-800 p-3.5 rounded-xl border border-amber-100 text-xs">
                  <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <p>
                    <strong>Nota:</strong> O gerador irá automaticamente unificar todas as seções da política para garantir que o PDF seja gerado completo e sem cortes.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDownloadPdf}
                  className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer text-center shadow-xs hover:shadow-sm"
                >
                  Confirmar e Gerar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Embedded Print CSS Overrides */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background: white !important;
            color: #0f172a !important;
            font-size: 11pt !important;
          }
          
          /* Hide interactive/web elements */
          .no-print,
          header,
          footer,
          button,
          input,
          select,
          textarea,
          [role="tablist"],
          [role="dialog"],
          .backdrop-blur-sm,
          .bg-teal-950,
          .bg-slate-50.p-4.rounded-2xl.border.border-slate-100.mb-6,
          .flex.flex-wrap.gap-1\\.5.border-b,
          .bg-slate-50.border.border-slate-200.rounded-2xl.p-5, /* DPO helper widget */
          .bg-teal-50\\/70.border.border-teal-200 { /* Accept banner */
            display: none !important;
          }

          /* Ensure outer elements don't disrupt full width print rendering */
          .max-w-4xl, .bg-white, .rounded-3xl, .shadow-xs, .p-6, .p-10, .border {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
            max-width: 100% !important;
            width: 100% !important;
          }

          /* General spacing layout */
          section {
            page-break-inside: avoid;
            margin-bottom: 28pt !important;
            display: block !important;
          }

          h1 {
            font-size: 26pt !important;
            font-weight: 800 !important;
            color: #0f172a !important;
            margin-bottom: 12pt !important;
          }
          
          h2 {
            font-size: 16pt !important;
            font-weight: 700 !important;
            color: #0f172a !important;
            margin-top: 24pt !important;
            margin-bottom: 10pt !important;
            border-bottom: 1px solid #e2e8f0 !important;
            padding-bottom: 4pt !important;
            page-break-after: avoid;
          }

          h3 {
            font-size: 12pt !important;
            font-weight: 700 !important;
            color: #1e293b !important;
            margin-top: 16pt !important;
            margin-bottom: 6pt !important;
            page-break-after: avoid;
          }

          p, span, li, strong, div {
            color: #334155 !important;
            font-size: 10pt !important;
            line-height: 1.5 !important;
          }

          /* Print cards neatly without clip */
          .grid {
            display: block !important;
          }

          .grid > div {
            page-break-inside: avoid;
            margin-bottom: 14pt !important;
            background: #f8fafc !important;
            border: 1px solid #cbd5e1 !important;
            padding: 14pt !important;
            border-radius: 8px !important;
          }

          .bg-slate-50\\/50 {
            background: #f8fafc !important;
            border: 1px solid #cbd5e1 !important;
            padding: 14pt !important;
            border-radius: 8px !important;
            margin-bottom: 14pt !important;
            page-break-inside: avoid;
          }

          .space-y-4 > div {
            page-break-inside: avoid;
          }

          @page {
            size: A4 portrait;
            margin: 20mm 15mm 20mm 15mm;
          }
        }
      `}} />

    </div>
  );
};

export default App;
