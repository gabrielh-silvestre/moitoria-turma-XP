# Passo a passo

<details>
  <summary><strong>Iniciar o pacote e instalar as dependencias</strong></summary><br />

  <label>
    <input type="checkbox">
      Iniciar uma aplicação Node
    </input>
  </label>
  </br>

~~~
npm init -y
~~~     
  <label>
    <input type="checkbox">
      Criar a .gitignore para não subir arquivos desnecessários para o Git, pode criar manualmente ou executar o seguinte comando no terminal 
    </input>
  </label>
  </br>
 
~~~
gi node >> .gitignore
~~~
  <label>
    <input type="checkbox">
      Instalar os pacotes da aplicação
    </input>
  </label>
  </br>
 
~~~bash
npm install express mysql2 joi
~~~

  <label>
    <input type="checkbox">
      Instalar os pacotes de desenvolvimento
    </input>
  </label>
  </br>
 
~~~
npm install nodemon -D
~~~

  <label>
    <input type="checkbox">
      Alterar os scripts do package.json
    </input>
  </label>
  </br>
 
</details>

<details>
  <summary><strong>Criar a estrutura das camadas</strong></summary><br />

  <label>
    <input type="checkbox">
      Criar a camada de Controllers
    </input>
  </label>
  </br>


  <label>
    <input type="checkbox">
      Criar a camada de Services
    </input>
  </label>
  </br>
 
  <label>
    <input type="checkbox">
      Criar a camada de Models
    </input>
  </label>
  </br>
 
    <label>
      <input type="checkbox">
        Criar a conexão com o banco de dados
      </input>
    </label>
    </br>
   

~~~
  //connection.js

  const mysql = require('mysql2/promise');
    
  const connection = mysql.createPool({ 
    host: 'localhost', 
    user: 'root', 
    password: 'docker', 
    database: 'insert_your_database_here', 
  });

  module.exports = connection;
    
~~~

  <label>
    <input type="checkbox">
      Criar a pasta de rotas
    </input>
  </label>
  </br>
 

</details>

<details>
  <summary><strong>Comando secreto</strong></summary><br />

  Você pode seguir os passos acima e acompanhar cada etapa, ou pode simplesmente executar o comando a seguir, que irá criar tudo e mais um pouco

~~~
npx backend-script
~~~

Para mais informações: <a target="_blank" href="https://www.npmjs.com/package/backend-script">https://www.npmjs.com/package/backend-script</a>

</details>

