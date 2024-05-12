<p>Jak włączyć projekt?</p>

<p>Musimy mieć zainstalowane dwie wersje oprogramowania, Node oraz NPM.</p>
<p>Node w wersji v20.11.0</p>
<p>Npm w wersji v10.2.4</p>
<p>Następnie usuwamy katalog node_modules, są w nim zależności, które musimy ponownie zainstalować wpisując komendę "npm install" do terminala w folderze "studia"</p>
<p>Uruchamiamy projekt wpisując komendę w terminal "npm run dev", uruchomi się na porcie 3000, zadeklarowanym w pliku "vite.config.js".</p>
<p>W katalogu src, mamy pliki odnośnie wyglądu strony.</p>

<p>Opis foldrów:</p>
<p>assets - zdjęcia i ikony,</p>
<p>components - komponenty, które załączamy na podstronach, "MainHeader' oraz "MainMobileHeader", deklarujemy to w innych plikach, aby móc je wywołać. Menu i menu mobilne.</p>
<p>router - Ścieżki deklarowane, w routingu, które są używane do zarządzania stanem aplikacji.</p>
<p>subpages - podstrony z treścią front-endu.</p>
<p>main.js - plik w Vue w którym załączamy router oraz zależności.</p>
<p>vite.config.js - plik konfiguracyjny w Vue, deklarujemy port oraz aliasy.</p>
<p>App.vue - główny plik komponentu, to na nim vue-router wywołuje komponenty z podstronami.</p>
