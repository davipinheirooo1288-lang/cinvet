# 🏥 Cinvet - Hospital Veterinário 24 Horas

Este projeto foi reorganizado para ser um site premium de página única (Single-Page App) utilizando **React**, **Vite**, **TypeScript** e **Tailwind CSS**. A estrutura de pastas foi simplificada e agora é um projeto Vite padrão diretamente na raiz, tornando muito mais fácil realizar atualizações.

---

## 📂 Estrutura de Arquivos Simplificada

Aqui está onde ficam os arquivos principais caso você precise atualizar o site:

*   **`src/pages/Home.tsx`** 👈 **O arquivo mais importante!**
    *   Contém todo o conteúdo visual do site: textos, depoimentos, seções, horários, telefones e formulários de agendamento.
    *   Edite este arquivo se precisar alterar qualquer informação escrita, links de WhatsApp ou botões.
*   **`public/`**
    *   Esta pasta contém todos os recursos estáticos como imagens (logotipo, fotos das seções) e vídeos de demonstração em alta resolução.
    *   Para substituir uma foto ou vídeo, basta colocar o novo arquivo nesta pasta com o mesmo nome (ex: `cinvet-inicio-4k.png` para a foto principal, ou `cinvet-logo-4k.png` para a logo).
*   **`src/index.css`**
    *   Guarda todo o design visual e estilos customizados do site.
*   **`src/components/ui/`**
    *   Componentes reutilizáveis de interface (como botões, acordeões e caixas de diálogo) baseados em Shadcn UI.
*   **`vercel.json`**
    *   Configuração de deploy instantâneo na Vercel (já ajustada para a nova estrutura na raiz).

---

## 🚀 Como Executar o Projeto Localmente

Para rodar e testar o site no seu computador, certifique-se de ter o **Node.js** instalado e siga estes passos simples pelo terminal dentro da pasta `Premium-Site`:

1.  **Instalar Dependências:**
    ```bash
    npm install
    ```
    *(Este comando baixa e instala todos os pacotes necessários automaticamente).*

2.  **Iniciar Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```
    *(O site estará ativo e você poderá visualizá-lo em `http://localhost:5173` no seu navegador. Qualquer alteração que você fizer no código será atualizada em tempo real!)*

3.  **Compilar para Produção:**
    ```bash
    npm run build
    ```
    *(Gera os arquivos finais otimizados para publicação dentro da pasta `dist/public`).*

---

## 🌐 Publicação (Deploy)

O site está configurado para deploy imediato no **GitHub** e em plataformas de hospedagem como a **Vercel** ou **Cloudflare Pages**. Como as configurações do Vite e TypeScript foram movidas para a raiz, qualquer plataforma reconhecerá e publicará o site automaticamente sem a necessidade de comandos manuais adicionais.
