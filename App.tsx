import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
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
  Info,
  Download,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  // States for Toast notification system
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // States for PDF download modal
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleCopyLink = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        showToast('Link de compartilhamento copiado!', 'success');
        setTimeout(() => setCopied(false), 2000);
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch (e) {
      // Fallback copy implementation
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      // Style to hide the textarea
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopied(true);
          showToast('Link de compartilhamento copiado!', 'success');
          setTimeout(() => setCopied(false), 2000);
        } else {
          showToast('Copie o endereço diretamente da barra do seu navegador.', 'info');
        }
      } catch (err) {
        showToast('Copie o endereço diretamente da barra do seu navegador.', 'info');
      }
      document.body.removeChild(textArea);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    setShowPdfModal(true);
  };

  const handleConfirmDownloadPdf = () => {
    setShowPdfModal(false);
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      let posY = 20;
      const marginX = 20;
      const pageWidth = 210;
      const pageHeight = 297;
      const printableWidth = pageWidth - (2 * marginX);
      let pageNum = 1;

      // Helper to check for page overflow
      const checkPageOverflow = (neededHeight: number) => {
        if (posY + neededHeight > pageHeight - 20) {
          drawFooter();
          doc.addPage();
          pageNum++;
          posY = 20;
          drawHeader();
        }
      };

      // Header drawing function for subsequent pages
      const drawHeader = () => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text('POLÍTICA DE PRIVACIDADE - PORTAL DO ASSOCIADO AFEA', marginX, 12);
        doc.setDrawColor(226, 232, 240); // slate-200
        doc.setLineWidth(0.2);
        doc.line(marginX, 14, pageWidth - marginX, 14);
        posY = 22;
      };

      // Footer drawing function for all pages
      const drawFooter = () => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.setDrawColor(226, 232, 240); // slate-200
        doc.setLineWidth(0.2);
        doc.line(marginX, pageHeight - 15, pageWidth - marginX, pageHeight - 15);
        doc.text('Associação Fluminense de Engenheiros e Arquitetos - CNPJ 30.136.865/0001-40', marginX, pageHeight - 10);
        doc.text(`Página ${pageNum}`, pageWidth - marginX - 15, pageHeight - 10);
      };

      // Title / Cover section (only on page 1)
      doc.setFillColor(13, 148, 136); // teal-600
      doc.rect(0, 0, pageWidth, 6, 'F');

      // Brand Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(13, 148, 136); // teal-600
      doc.text('AFEA - DOCUMENTO OFICIAL', marginX, 16);

      doc.setFontSize(22);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text('Política de Privacidade', marginX, 26);

      doc.setFontSize(12);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text('Portal do Associado & Carteira Digital', marginX, 33);

      // Version box
      doc.setFillColor(241, 245, 249); // slate-100
      doc.rect(marginX, 38, printableWidth, 16, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text('Última Atualização:', marginX + 4, 44);
      doc.setFont('helvetica', 'normal');
      doc.text('14 de julho de 2026', marginX + 38, 44);
      doc.setFont('helvetica', 'bold');
      doc.text('Versão:', marginX + 4, 50);
      doc.setFont('helvetica', 'normal');
      doc.text('2.0 (Unificada LGPD)', marginX + 18, 50);

      posY = 64;

      // Introduction text
      const introParagraphs = [
        "A Associação Fluminense de Engenheiros e Arquitetos (AFEA), CNPJ nº 30.136.865/0001-40, com sede na Av. Roberto Silveira, 245 – Icaraí – Niterói - RJ, valoriza a privacidade e a segurança das informações de seus associados. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos os seus dados pessoais no âmbito do Portal do Associado e na emissão da Carteira Digital do Associado.",
        "A sua privacidade é prioridade para a AFEA. É política do nosso aplicativo respeitar a sua privacidade em relação a qualquer informação sua que possamos tratar no Portal do Associado. O tratamento de dados pessoais é fundamentado estritamente nas hipóteses legais previstas no Artigo 7º da LGPD (Lei nº 13.709/2018), com destaque para a Execução de Contrato/Estatuto Associativo, Cumprimento de Obrigação Legal e Regulatória, Legítimo Interesse e Prevenção à Fraude. O consentimento é utilizado de forma pontual para finalidades facultativas e específicas solicitadas pelo associado.",
        "Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados."
      ];

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85); // slate-700

      introParagraphs.forEach(para => {
        const splitPara = doc.splitTextToSize(para, printableWidth);
        const height = splitPara.length * 5;
        checkPageOverflow(height + 6);
        doc.text(splitPara, marginX, posY);
        posY += height + 6;
      });

      // Accept Electronic Alert Box
      const acceptAlertText = "Aceite Eletrônico & Vinculação Legal: Ao marcar a caixa de seleção de concordância na tela de login e acessar o portal, você, na qualidade de associado titular, declara ter lido, compreendido e concordado com os Termos de Uso e com esta Política de Privacidade, estendendo essa concordância aos seus dependentes cadastrados.";
      const splitAlert = doc.splitTextToSize(acceptAlertText, printableWidth - 8);
      const alertHeight = splitAlert.length * 4.5 + 8;
      checkPageOverflow(alertHeight + 10);

      doc.setFillColor(240, 253, 250); // teal-50
      doc.setDrawColor(204, 251, 241); // teal-100
      doc.setLineWidth(0.3);
      doc.rect(marginX, posY, printableWidth, alertHeight, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(17, 94, 89); // teal-800
      doc.text(splitAlert, marginX + 4, posY + 6);
      posY += alertHeight + 10;

      // --- SECTIONS ---
      const sections = [
        {
          title: "1. Informações que Coletamos",
          intro: "Para fornecer os serviços do portal e emitir a Carteira Digital do Associado, coletamos e tratamos as seguintes categorias de dados pessoais, estruturadas de forma limpa e sem duplicidades para garantir transparência total:",
          subsections: [
            {
              subtitle: "Dados Cadastrais e de Perfil",
              text: "Nome completo, número de registro profissional (CREA/CAU), data de nascimento, categoria de associação, matrícula e data de admissão. As contas de acesso são pré-criadas com base nos dados existentes para fins de autenticação de identidade."
            },
            {
              subtitle: "Dados de Contato",
              text: "Endereço de e-mail e número de telefone celular. Utilizados para comunicação administrativa e envio de alertas relevantes sobre reservas e suporte."
            },
            {
              subtitle: "Dados de Identificação Visual (Carteira Digital)",
              text: "Foto de perfil enviada diretamente pelo usuário ou capturada por câmera para fins de identificação visual na carteira digital, validada administrativamente."
            },
            {
              subtitle: "Dados de Dependentes",
              text: "Nome completo, parentesco e data de nascimento dos dependentes. Informações fornecidas pelo associado titular sob consentimento legal para cadastro e acesso."
            },
            {
              subtitle: "Registros de Acesso e Coletas Automáticas",
              text: "Endereço IP, tipo de navegador, sistema operacional, data/hora de acesso e registros de aceite assinados digitalmente para auditoria de segurança."
            }
          ]
        },
        {
          title: "2. Finalidade do Tratamento de Dados & Bases Legais (Art. 7º da LGPD)",
          intro: "Tratamos os seus dados pessoais em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD), vinculando expressamente cada finalidade a uma base legal específica autorizada pela legislação:",
          subsections: [
            {
              subtitle: "A. Emissão e Validação da Carteira Digital",
              text: "Identificação e validação imediata do associado titular e seus dependentes nas dependências da AFEA e parceiros. Base Legal: Execução de Contrato e Estatuto Associativo (Art. 7º, V da LGPD)."
            },
            {
              subtitle: "B. Prestação de Serviços do Portal, Reservas e Atualizações Cadastrais",
              text: "Processamento de reservas de churrasqueiras, gerenciamento administrativo de atualizações cadastrais e comunicados oficiais. Base Legal: Execução de Contrato/Estatuto (Art. 7º, V da LGPD) e Consentimento do Titular (Art. 7º, I da LGPD) para inclusão voluntária de dependentes e envio de comunicados facultativos."
            },
            {
              subtitle: "C. Segurança, Biometria Visual e Vínculo de Dispositivos",
              text: "Prevenção a fraudes, validação de foto de perfil e limitação de logins simultâneos em múltiplos dispositivos sob a mesma matrícula. Base Legal: Legítimo Interesse do Controlador (Art. 7º, IX da LGPD) e Prevenção à Fraude e Segurança do Titular (Art. 7º, IX e X da LGPD; Art. 11, II, 'g')."
            },
            {
              subtitle: "D. Obrigações Legais e Regulatórias",
              text: "Retenção de logs de acesso de acordo com o exigido pela Legislação Federal e o Marco Civil da Internet (Lei nº 12.965/2014). Base Legal: Cumprimento de Obrigação Legal ou Regulatória (Art. 7º, II da LGPD)."
            }
          ]
        },
        {
          title: "3. Compartilhamento, Armazenamento e Transferência Internacional de Dados",
          intro: "Os dados pessoais dos associados são armazenados em ambiente de nuvem altamente seguro, sob critérios de confidencialidade e salvaguardas contratuais rigorosas:",
          bullets: [
            "Sem Fins Comerciais: A AFEA não comercializa, aluga ou compartilha dados com terceiros para fins de marketing ou publicidade.",
            "Provedores de Infraestrutura e Transferência Internacional (Art. 33 da LGPD): Os dados são processados e hospedados em servidores de nuvem de grande porte (Google Firebase para autenticação e banco de dados ágil, e Google Drive/Cloud para gestão de cadastros). Tendo em vista que os data centers dessas provedoras podem estar localizados fora do Brasil, ocorre Transferência Internacional de Dados (Art. 33, I e II da LGPD), resguardada por cláusulas contratuais padrão, certificações ISO/IEC 27001 e nível adequado de segurança compatível com a LGPD.",
            "Provedores de Serviços de TI: Apenas empresas terceirizadas sob contrato rígido de proteção de dados atuando sob direção da associação na qualidade de operadoras.",
            "Cumprimento da Lei: Compartilhamento restrito aos termos de mandados judiciais oficiais ou obrigações federais."
          ]
        },
        {
          title: "4. Segurança da Informação",
          intro: "Adotamos as melhores práticas técnicas e organizacionais para salvaguardar todos os dados pessoais coletados no sistema:",
          bullets: [
            "Criptografia na transmissão (protocolo de segurança SSL/TLS ativo).",
            "Controle rígido e restrito de privilégios de acesso administrativo.",
            "Geração de chaves criptográficas para assinaturas digitais de termos.",
            "Bloqueio ativo de logins simultâneos suspeitos em aparelhos não reconhecidos."
          ]
        },
        {
          title: "5. Seus Direitos enquanto Titular de Dados (Art. 18 da LGPD)",
          intro: "Como titular de dados pessoais, você pode exercer os direitos previstos no Art. 18 da LGPD a qualquer momento de forma gratuita e simplificada:",
          bullets: [
            "Confirmação e Acesso (Art. 18, I e II): Direito de confirmar a existência de tratamento e acessar os seus dados cadastrados a qualquer instante.",
            "Correção de Dados (Art. 18, III): Retificação imediata de dados incompletos, inexatos ou desatualizados.",
            "Anonimização, Bloqueio ou Eliminação (Art. 18, IV): Requerer a anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei.",
            "Portabilidade dos Dados (Art. 18, V): Solicitar a portabilidade dos dados a outro fornecedor de serviço ou entidade, mediante requisição expressa e observados os segredos comercial e industrial.",
            "Eliminação de Dados com Consentimento (Art. 18, VI): Solicitar a exclusão de dados tratados unicamente com base no consentimento, ressalvadas as hipóteses de guarda legal obrigatória.",
            "Informação sobre Compartilhamento (Art. 18, VII): Obter informação clara sobre entidades públicas e privadas com as quais o controlador realizou uso compartilhado de dados.",
            "Informação sobre Opção de Não Consentir (Art. 18, VIII): Ser informado sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa.",
            "Revogação do Consentimento (Art. 18, IX): Revogar a qualquer momento o consentimento concedido para finalidades específicas (pode implicar na desativação do acesso à carteira digital)."
          ]
        },
        {
          title: "6. Retenção de Dados",
          intro: "Os dados cadastrais e registros são guardados de forma segura enquanto durar o seu vínculo de associação ativo na AFEA. Após desligamento, reteremos apenas o período estritamente exigido para cumprimento de obrigações contábeis, judiciais e regulatórias vigentes."
        },
        {
          title: "7. Privacidade de Menores",
          intro: "O login individual e acesso autônomo ao aplicativo é restrito a maiores de 12 anos. O cadastro de dependentes infantis menores de 12 anos é coletado unicamente através do responsável legal (associado titular) para controle de acesso às dependências físicas."
        },
        {
          title: "8. Alterações a esta Política de Privacidade",
          intro: "Reservamos o direito de atualizar este termo periodicamente. Quaisquer atualizações relevantes serão notificadas através de comunicado de destaque na tela de acesso do portal."
        },
        {
          title: "9. Controlador e Encarregado pelo Tratamento de Dados (DPO)",
          intro: "Controlador dos Dados:\nAssociação Fluminense de Engenheiros e Arquitetos (AFEA)\nCNPJ nº 30.136.865/0001-40\nSede: Av. Roberto Silveira, 245 – Icaraí – Niterói - RJ\n\nEncarregado pelo Tratamento de Dados (DPO):\nComitê Interno de Proteção de Dados e Privacidade da AFEA / Encarregado pelo Tratamento de Dados (DPO).\nPara dúvidas, requisições dos direitos do Art. 18 da LGPD ou contato com autoridades, fale diretamente com o DPO pelo e-mail oficial: atendimento@afea-rj.org.br."
        }
      ];

      sections.forEach(sec => {
        // Draw section Title
        checkPageOverflow(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text(sec.title, marginX, posY);
        posY += 6;

        // Draw intro paragraph
        if (sec.intro) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9.5);
          doc.setTextColor(51, 65, 85); // slate-700
          const splitIntro = doc.splitTextToSize(sec.intro, printableWidth);
          const introHeight = splitIntro.length * 4.5;
          checkPageOverflow(introHeight + 4);
          doc.text(splitIntro, marginX, posY);
          posY += introHeight + 5;
        }

        // Draw subsections if they exist
        if (sec.subsections) {
          sec.subsections.forEach(sub => {
            checkPageOverflow(18);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(13, 148, 136); // teal-600
            doc.text(sub.subtitle, marginX + 4, posY);
            posY += 4.5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(71, 85, 105); // slate-600
            const splitSubText = doc.splitTextToSize(sub.text, printableWidth - 8);
            const subTextHeight = splitSubText.length * 4;
            checkPageOverflow(subTextHeight + 6);
            doc.text(splitSubText, marginX + 4, posY);
            posY += subTextHeight + 6;
          });
        }

        // Draw bullets if they exist
        if (sec.bullets) {
          sec.bullets.forEach(bullet => {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(71, 85, 105); // slate-600
            const fullBulletText = `- ${bullet}`;
            const splitBullet = doc.splitTextToSize(fullBulletText, printableWidth - 6);
            const bulletHeight = splitBullet.length * 4;
            checkPageOverflow(bulletHeight + 3);
            doc.text(splitBullet, marginX + 4, posY);
            posY += bulletHeight + 3.5;
          });
        }

        posY += 4; // spacing between sections
      });

      // Final signature and confirmation
      checkPageOverflow(25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text('AFEA - Gestão Geral de Proteção de Dados', marginX, posY);
      posY += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text('Este documento é uma cópia oficial e fidedigna para arquivamento pessoal do associado.', marginX, posY);

      // Draw final page footer
      drawFooter();

      // Save
      doc.save('Politica_de_Privacidade_AFEA.pdf');
      showToast('PDF gerado e baixado com sucesso!', 'success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      showToast('Erro ao gerar PDF. Se estiver em visualizador integrado, por favor clique no botão "Abrir em Nova Aba" no topo do portal.', 'error');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Helper to highlight searched terms inside text (returns plain text since search is removed)
  const highlightText = (text: string) => {
    return text;
  };

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

          {/* Document Utilities Row */}
          <div className="flex items-center justify-end bg-slate-50 p-3.5 rounded-2xl border border-slate-100 mb-6">
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                title="Baixar PDF"
                className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all shrink-0 ${
                  isGeneratingPdf 
                    ? 'bg-teal-100 text-teal-400 cursor-not-allowed' 
                    : 'bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-100 cursor-pointer'
                }`}
              >
                {isGeneratingPdf ? (
                  <svg className="animate-spin h-4 w-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Download className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={handlePrint}
                title="Imprimir"
                className="w-9 h-9 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-600 rounded-xl border border-slate-200 transition-all cursor-pointer shrink-0"
              >
                <Printer className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopyLink}
                title={copied ? "Copiado!" : "Compartilhar link"}
                className="w-9 h-9 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-600 rounded-xl border border-slate-200 transition-all relative cursor-pointer shrink-0"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
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
                "A sua privacidade é prioridade para a AFEA. É política do nosso aplicativo respeitar a sua privacidade em relação a qualquer informação sua que possamos tratar no Portal do Associado. O tratamento de dados pessoais é fundamentado estritamente nas hipóteses legais previstas no Artigo 7º da LGPD (Lei nº 13.709/2018), com destaque para a Execução de Contrato/Estatuto Associativo, Cumprimento de Obrigação Legal e Regulatória, Legítimo Interesse e Prevenção à Fraude. O consentimento é utilizado de forma pontual para finalidades facultativas e específicas solicitadas pelo associado."
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
          <section className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">1</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Informações que Coletamos</h2>
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
              </section>

          {/* Section 2: Finalidade do Tratamento & Bases Legais */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">2</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Finalidade do Tratamento de Dados &amp; Bases Legais (Art. 7º da LGPD)</h2>
            </div>

                <p className="text-slate-600 text-sm">
                  {highlightText(
                    "Tratamos os seus dados pessoais em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD), vinculando expressamente cada finalidade de tratamento a uma base legal autorizadora:"
                  )}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-100 bg-[#fbfdfd] hover:border-teal-100 transition-all space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-teal-900 text-xs uppercase tracking-wider">A. Emissão da Carteira Digital</h4>
                      <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-teal-200">
                        Art. 7º, V
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {highlightText(
                        "Identificação e validação segura e imediata do associado titular e seus dependentes cadastrados nas dependências da AFEA e em parceiros conveniados."
                      )}
                    </p>
                    <div className="text-[11px] font-semibold text-teal-800 pt-1 border-t border-slate-100">
                      Base Legal: Execução de Contrato e Estatuto Associativo (Art. 7º, V da LGPD).
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-100 bg-[#fbfdfd] hover:border-teal-100 transition-all space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-teal-900 text-xs uppercase tracking-wider">B. Prestação de Serviços do Portal</h4>
                      <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-teal-200">
                        Art. 7º, V e I
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {highlightText(
                        "Processamento de reservas de churrasqueiras, gerenciamento administrativo de atualizações cadastrais efetuadas pelos próprios membros, e envio de avisos oficiais importantes."
                      )}
                    </p>
                    <div className="text-[11px] font-semibold text-teal-800 pt-1 border-t border-slate-100">
                      Base Legal: Execução de Contrato/Estatuto (Art. 7º, V) e Consentimento do Titular (Art. 7º, I) para inclusões voluntárias de dependentes.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-100 bg-[#fbfdfd] hover:border-teal-100 transition-all space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-teal-900 text-xs uppercase tracking-wider">C. Segurança, Biometria Visual e Vínculo</h4>
                      <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-teal-200">
                        Art. 7º, IX e X
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {highlightText(
                        "Prevenção ativa a fraudes e acessos indevidos. Nosso sistema vincula o dispositivo (celular, tablet ou PC) à sua matrícula, impedindo logins simultâneos suspeitos em múltiplos aparelhos sob a mesma conta."
                      )}
                    </p>
                    <div className="text-[11px] font-semibold text-teal-800 pt-1 border-t border-slate-100">
                      Base Legal: Legítimo Interesse (Art. 7º, IX) e Prevenção à Fraude e Segurança do Titular (Art. 7º, IX/X e Art. 11, II, 'g').
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-100 bg-[#fbfdfd] hover:border-teal-100 transition-all space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-teal-900 text-xs uppercase tracking-wider">D. Obrigações Legais e de Auditoria</h4>
                      <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-teal-200">
                        Art. 7º, II
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {highlightText(
                        "Retenção obrigatoriedade de logs de conexão e de acessos ao sistema para fins de auditoria e segurança cibernética."
                      )}
                    </p>
                    <div className="text-[11px] font-semibold text-teal-800 pt-1 border-t border-slate-100">
                      Base Legal: Cumprimento de Obrigação Legal/Regulatória (Art. 7º, II da LGPD) e Marco Civil da Internet (Lei nº 12.965/2014).
                    </div>
                  </div>
                </div>

                {/* Bases Legais (original content expanded & unified) */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm">Resumo Detalhado das Hipóteses Legais do Art. 7º da LGPD:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs">
                      <span className="font-bold text-teal-800 block mb-1">Execução de Contrato / Estatuto (Art. 7º, V):</span>
                      <p className="text-slate-600 leading-relaxed">
                        {highlightText(
                          "A maioria dos dados que utilizamos (nome, matrícula, registros profissionais e status de associado) são tratados para viabilizar o seu vínculo associativo e executar nossas obrigações estatutárias e contratuais com você."
                        )}
                      </p>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs">
                      <span className="font-bold text-teal-800 block mb-1">Consentimento do Titular (Art. 7º, I):</span>
                      <p className="text-slate-600 leading-relaxed">
                        {highlightText(
                          "Aplicado unicamente para ações proativas e facultativas do associado, tais como envio voluntário de nova foto de perfil, inclusão facultativa de dependentes ou requisições específicas."
                        )}
                      </p>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs">
                      <span className="font-bold text-teal-800 block mb-1">Legítimo Interesse &amp; Prevenção a Fraudes (Art. 7º, IX e X):</span>
                      <p className="text-slate-600 leading-relaxed">
                        {highlightText(
                          "Utilizamos logs de rede, IP e vinculação lógica de dispositivos para auditorias de segurança, prevenção de acessos simultâneos indevidos e proteção contra invasões cibernéticas."
                        )}
                      </p>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-2xs">
                      <span className="font-bold text-teal-800 block mb-1">Cumprimento de Obrigação Legal (Art. 7º, II):</span>
                      <p className="text-slate-600 leading-relaxed">
                        {highlightText(
                          "Guarda e tratamento de registros de conexões e acessos obrigatórios impostos pela Lei nº 12.965/2014 (Marco Civil da Internet) e legislação tributária/contábil vigente."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

          {/* Section 3: Compartilhamento, Armazenamento e Transferência Internacional de Dados */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">3</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Compartilhamento, Armazenamento e Transferência Internacional de Dados</h2>
            </div>

                <p className="text-slate-700 leading-relaxed text-sm">
                  {highlightText(
                    "Os dados pessoais dos associados são armazenados em ambiente de nuvem seguro, estruturado e com confidencialidade garantida por contratos rigorosos e políticas institucionais:"
                  )}
                </p>

                <div className="space-y-3.5 pl-1 text-xs sm:text-sm text-slate-600">
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
                      <strong>Provedores de Infraestrutura de Nuvem:</strong> {highlightText(
                        "Os dados são processados e armazenados em plataformas de infraestrutura tecnológica líderes de mercado (como Google Firebase para autenticação e banco de dados em tempo real, e Google Drive/Cloud para gestão documental de cadastros)."
                      )}
                    </p>
                  </div>

                  {/* Transferência Internacional Box */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 mt-2">
                    <div className="flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-teal-600" />
                      <span>Cláusula de Transferência Internacional de Dados (Art. 33 da LGPD)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {highlightText(
                        "Devido ao uso de serviços de infraestrutura de nuvem global (Google Firebase / Google Cloud Infrastructure), os dados armazenados podem ser hospedados em servidores localizados fora do território nacional (principalmente nos Estados Unidos). Esta operação caracteriza Transferência Internacional de Dados nos termos do Art. 33, I e II da LGPD. Declaramos que os provedores contratados cumprem rigorosas cláusulas contratuais padrão de segurança, certificações ISO/IEC 27001 e acordos internacionais de privacidade que asseguram um nível de proteção de dados equivalente ou superior ao exigido pela legislação brasileira."
                      )}
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-2"></span>
                    <p>
                      <strong>Provedores de Serviços de TI:</strong> {highlightText(
                        "Compartilhamento restrito a empresas contratadas para suporte tecnológico e manutenção lógica do portal, as quais atuam estritamente como operadoras e sob comando direto e instrução formal da associação."
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
              </section>

          {/* Section 4: Segurança da Informação */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">4</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Segurança da Informação</h2>
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
              </section>

          {/* Section 5: Seus Direitos (LGPD) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">5</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Seus Direitos enquanto Titular de Dados (Art. 18 da LGPD)</h2>
            </div>

            <p className="text-slate-700 leading-relaxed text-sm">
              {highlightText(
                "Como titular de dados pessoais, você possui os seguintes direitos garantidos expressamente pelo Artigo 18 da LGPD, os quais podem ser exercidos gratuitamente junto ao Encarregado de Dados da AFEA:"
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Confirmação e Acesso (Art. 18, I e II):</strong> Confirmar a existência de tratamento e acessar os seus dados cadastrados.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Correção de Dados (Art. 18, III):</strong> Solicitar a retificação imediata de dados incompletos, inexatos ou desatualizados.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Anonimização, Bloqueio ou Eliminação (Art. 18, IV):</strong> Requerer a exclusão de dados desnecessários ou tratados em desconformidade.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Portabilidade dos Dados (Art. 18, V):</strong> Solicitar a transferência dos seus dados a outro fornecedor ou entidade mediante requisição.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Eliminação com Consentimento (Art. 18, VI):</strong> Requerer a exclusão de dados tratados com base no consentimento (salvo guarda legal).</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Uso Compartilhado (Art. 18, VII):</strong> Receber informações sobre entidades públicas e privadas com as quais os dados foram compartilhados.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Opção de Não Consentir (Art. 18, VIII):</strong> Ser informado sobre a possibilidade de não fornecer consentimento e consequências.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Revogação do Consentimento (Art. 18, IX):</strong> Revogar o consentimento a qualquer tempo (pode desativar o acesso à carteira digital).</span>
              </div>
            </div>
          </section>

          {/* Section 6: Retenção de Dados */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">6</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Retenção de Dados</h2>
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
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Privacidade de Menores</h2>
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
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Alterações a esta Política de Privacidade</h2>
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
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Controlador e Encarregado de Dados (DPO)</h2>
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
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">Encarregado pelo Tratamento de Dados (DPO)</h4>
                  <p className="text-slate-700 leading-relaxed">
                    <strong>Comitê Interno de Proteção de Dados e Privacidade da AFEA / Encarregado de Dados Pessoais (DPO)</strong>
                    <br />
                    Para exercer seus direitos de titular (Art. 18 da LGPD) ou tirar dúvidas, contate o DPO pelo e-mail:
                    <a href="mailto:atendimento@afea-rj.org.br" className="text-teal-600 font-bold hover:text-teal-700 underline transition-colors block mt-1">
                      atendimento@afea-rj.org.br
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 10: Contato */}
          <section className="space-y-6 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="bg-teal-50 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">10</div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Contato Geral</h2>
            </div>
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
                    <p>Clique no botão <strong>"Baixar PDF Agora"</strong> abaixo.</p>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <p>O arquivo será gerado instantaneamente no seu dispositivo e o download começará sozinho.</p>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                    <p>Ideal para guardar em seu celular, tablet, computador ou enviar por e-mail.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-teal-50 text-teal-800 p-3.5 rounded-xl border border-teal-100 text-xs">
                  <Info className="w-4 h-4 shrink-0 text-teal-600 mt-0.5" />
                  <p>
                    <strong>Nota:</strong> O PDF é gerado localmente em alta definição, garantindo que nenhum dado saia do seu navegador.
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
                  className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer text-center shadow-xs hover:shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar PDF Agora</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800 p-4 flex items-center gap-3"
          >
            {toast.type === 'success' && (
              <div className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded-lg">
                <Check className="w-5 h-5" />
              </div>
            )}
            {toast.type === 'error' && (
              <div className="bg-rose-500/20 text-rose-400 p-1.5 rounded-lg">
                <ShieldAlert className="w-5 h-5" />
              </div>
            )}
            {toast.type === 'info' && (
              <div className="bg-teal-500/20 text-teal-400 p-1.5 rounded-lg">
                <Info className="w-5 h-5" />
              </div>
            )}
            <p className="text-xs sm:text-sm font-medium flex-1">{toast.message}</p>
            <button 
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
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
