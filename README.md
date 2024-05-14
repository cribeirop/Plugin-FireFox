# Plugin de Navegador
 
<div style="text-align: center;">
    <img src="icon.svg" width="250">
</div>

Este repositório contém um plugin para navegador FireFox desenvolvido como parte dos requisitos do projeto. O plugin tem como objetivo detectar e apresentar diversas informações relacionadas à navegação na web, incluindo conexões a domínios de terceiros, potenciais ameaças de sequestro de navegador, armazenamento de dados local e a quantidade de cookies e supercookies injetados em uma página.

## Funcionalidades

### 1. Conexões a Domínios de Terceiros
Detecta e apresenta as conexões a domínios de terceiros durante a navegação web.
### 2. Potenciais Ameaças de Sequestro de Navegador
Identifica e alerta sobre possíveis ameaças de sequestro de navegador, incluindo hijacking e hooking.
### 3. Armazenamento de Dados Local
Monitora e exibe o armazenamento de dados local (storage local) no dispositivo do usuário.
### 4. Quantidade de Cookies e Supercookies
Informa a quantidade de cookies e supercookies injetados durante o carregamento de uma página, diferenciando os tipos dos cookies.

## Instruções de Uso

Acesse `about:debugging` no navegador FireFox e clique em `Este Firefox` para carregar o plugin temporariamente. Em seguida, clique em `Carregar Extensão Temporária` e selecione o arquivo `manifest.json` deste diretório do plugin.

O plugin irá detectar automaticamente as informações relevantes e apresentá-las em um painel de controle.