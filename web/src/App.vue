<template>
  <div id="app" style="display: flex;">
    <div>
      <h2>Preguntes</h2>
      <br/>
      <ul>
        <li v-for="primeraPregunta in objPreg.llista" :key="primeraPregunta.id">
          <hr />
          {{ primeraPregunta.pregunta }}
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <button
              @click="respostaDesada(resposta)"
              v-for="(resposta, primeraResposta) in primeraPregunta.respostes"
              :key="primeraResposta"
              style="display: flex; align-items: center; text-align: center; width: calc(50% - 5px);"
            >
              <img
                :src="primeraPregunta.respostesImg[primeraResposta]"
                style="width: 40px; height: 40px; margin-right: 10px;"
              />
              {{ resposta }}
            </button>
          </div>
          <br />
          <button @click="editPregunta(primeraPregunta.id)">Editar</button>
          <button @click="deletePregunta(primeraPregunta.id)">Eliminar</button>
        </li>
      </ul>
    </div>

    <div v-if="isEditing" style="position: absolute; right: 0; top: 0; width: 300px; padding: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h2>Nova pregunta</h2>
      <input v-model="novaPregunta.pregunta" placeholder="Pregunta" />
      <div v-for="(resposta, index) in novaPregunta.respostes" :key="index">
        <input v-model="novaPregunta.respostes[index]" placeholder="Resposta" />
        <input v-model="novaPregunta.respostesImg[index]" placeholder="URL Imatge" />
      </div>
      <button @click="addOrUpdatePregunta">Afegir / Actualitzar</button>
      <button @click="cancelEdit">Cancelar</button>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const objPreg = reactive({
      llista: [
        { id: 0, pregunta: "Quina marca utilitza el logo d'una poma mossegada?", respostes: ["Microsoft", "Samsung", "Sony", "Apple"], respostesImg: ["img/microsoft.jpeg", "img/samsung.jpeg", "img/sony.png", "img/apple.png"] },
        { id: 1, pregunta: "Quina marca de begudes és coneguda pel seu logotip vermell amb lletres blanques?", respostes: ["Pepsi", "Coca-Cola", "Fanta", "Sprite"], respostesImg: ["img/pepsi.png", "img/cocacola.png", "img/fanta.png", "img/sprite.png"] },
        { id: 2, pregunta: "Quina marca de tecnologia té un logotip amb una lletra 'G' de colors?", respostes: ["Google", "Facebook", "Amazon", "Twitter"], respostesImg: ["img/google.png", "img/facebook.png", "img/amazon.png", "img/twitter.png"] },
        { id: 3, pregunta: "Quina marca de cotxes utilitza un logo amb quatre cercles entrellaçats?", respostes: ["BMW", "Audi", "Volkswagen", "Tesla"], respostesImg: ["img/bmw.png", "img/audi.png", "img/volkswagen.png", "img/tesla.png"] },
        { id: 4, pregunta: "Quina marca d'esports utilitza un logotip amb el símbol de la deessa grega Nike?", respostes: ["Puma", "Nike", "Adidas", "Reebok"], respostesImg: ["img/puma.png", "img/nike.png", "img/adidas.png", "img/reebok.png"] },
        { id: 5, pregunta: "Quina marca de menjar ràpid utilitza un logotip amb una gran 'M' daurada?", respostes: ["McDonald's", "Burger King", "Subway", "KFC"], respostesImg: ["img/mcdonald_s.png", "img/burger_king.png", "img/subway.png", "img/kfc.png"] },
        { id: 6, pregunta: "Quina marca de luxe utilitza un logotip amb dues lletres 'C' entrellaçades?", respostes: ["Louis Vuitton", "Gucci", "Chanel", "Hermès"], respostesImg: ["img/louis_vuitton.png", "img/gucci.png", "img/chanel.png", "img/hermes.png"] },
        { id: 7, pregunta: "Quina marca de moda esportiva utilitza tres ratlles paral·leles com a logotip?", respostes: ["Adidas", "Puma", "Nike", "Tommy Hilfiger"], respostesImg: ["img/adidas.png", "img/puma.png", "img/nike.png", "img/tommy_hilfiger.png"] },
        { id: 8, pregunta: "Quina marca d'electrònica utilitza un logotip en forma d'una fletxa somrient que apunta d'una 'A' a una 'Z'?", respostes: ["eBay", "Alibaba", "Amazon", "Walmart"], respostesImg: ["img/ebay.png", "img/alibaba.png", "img/amazon.png", "img/subway.png"] },
        { id: 9, pregunta: "Quina marca de tecnologia utilitza un logotip amb una 'F' blanca sobre fons blau?", respostes: ["Google", "Twitter", "Instagram", "Facebook"], respostesImg: ["img/google.png", "img/twitter.png", "img/instagram.png", "img/facebook.png"] },
        { id: 10, pregunta: "Quina marca utilitza un logotip amb dues lletres 'C' en colors contrastants?", respostes: ["Chanel", "Gucci", "Louis Vuitton", "Hermès"], respostesImg: ["img/chanel.png", "img/gucci.png", "img/louis_vuitton.png", "img/hermes.png"] },
        { id: 11, pregunta: "Quina marca d'electrònica és coneguda per la seva 'S' en color verd i blanc?", respostes: ["Sony", "Samsung", "Apple", "Microsoft"], respostesImg: ["img/sony.png", "img/samsung.jpeg", "img/apple.png", "img/microsoft.jpeg"] },
        { id: 12, pregunta: "Quina marca utilitza un logotip amb una bola blava i vermella amb una gran 'P' blanca?", respostes: ["Pepsi", "Coca-Cola", "Fanta", "Sprite"], respostesImg: ["img/pepsi.png", "img/cocacola.png", "img/fanta.png", "img/sprite.png"] },
        { id: 13, pregunta: "Quina marca utilitza un logotip amb dues lletres 'L' i 'V' una per sobre l'altre?", respostes: ["Chanel", "Gucci", "Louis Vuitton", "Hermès"], respostesImg: ["img/chanel.png", "img/gucci.png", "img/louis_vuitton.png", "img/hermes.png"] },
        { id: 14, pregunta: "Quina marca de tecnologia ha cambiat recenment el seu logo de un ocell blau a una 'X'?", respostes: ["Google", "Twitter", "Instagram", "Facebook"], respostesImg: ["img/google.png", "img/twitter.png", "img/instagram.png", "img/facebook.png"] },
        { id: 15, pregunta: "Quina marca d'automòbils té un logotip de una 'T'?", respostes: ["BMW", "Audi", "Tesla", "Volkswagen"], respostesImg: ["img/bmw.png", "img/audi.png", "img/tesla.png", "img/volkswagen.png"] },
        { id: 16, pregunta: "Quina marca de roba, de les que hi ha, no es de roba esportiva?", respostes: ["Puma", "Tommy Hilfiger", "Nike", "Adidas"], respostesImg: ["img/puma.png", "img/tommy_hilfiger.png", "img/nike.png", "img/adidas.png"] },
        { id: 17, pregunta: "Quina marca de roba patrocina al jugador de futbol 'Lionel Messi'?", respostes: ["Nike", "Adidas", "Puma", "Reebok"], respostesImg: ["img/nike.png", "img/adidas.png", "img/puma.png", "img/reebok.png"] },
        { id: 18, pregunta: "Quina marca es coneguda per oferir entrepans?", respostes: ["McDonald's", "Burger King", "Subway", "KFC"], respostesImg: ["img/mcdonald_s.png", "img/burger_king.png", "img/subway.png", "img/kfc.png"] },
        { id: 19, pregunta: "Quina d'aquestes es una marca de cotxes?", respostes: ["McDonald's", "Volkswagen", "Alibaba", "Twitter"], respostesImg: ["img/mcdonald_s.png", "img/volkswagen.png", "img/alibaba.png", "img/twitter.png"] },
      ]
    });

    const isEditing = reactive({ value: false });
    const currentEditIndex = reactive({ value: -1 });
    const novaPregunta = reactive({ pregunta: "", respostes: ["", "", "", ""], respostesImg: ["", "", "", ""] });

    const toggleCRUD = () => {
      isEditing.value = !isEditing.value;
      if (!isEditing.value) {
        cancelEdit();
      }
    };

    const addOrUpdatePregunta = () => {
      if (currentEditIndex.value === -1) {
        const newId = objPreg.llista.length;
        objPreg.llista.push({ id: newId, ...novaPregunta });
      } else {
        objPreg.llista[currentEditIndex.value] = { ...objPreg.llista[currentEditIndex.value], ...newPregunta };
      }
      cancelEdit();
    };

    const editPregunta = (id) => {
      const index = objPreg.llista.findIndex(pregunta => pregunta.id === id);
      novaPregunta.pregunta = objPreg.llista[index].pregunta;
      novaPregunta.respostes = [...objPreg.llista[index].respostes];
      novaPregunta.respostesImg = [...objPreg.llista[index].respostesImg];
      isEditing.value = true;
    };

    const deletePregunta = (id) => {
      objPreg.llista = objPreg.llista.filter((pregunta) => pregunta.id !== id);
    };

    const cancelEdit = () => {
      currentEditIndex.value = -1;
      novaPregunta.pregunta = "";
      novaPregunta.respostes = ["", "", "", ""];
      novaPregunta.respostesImg = ["", "", "", ""];
    };

    const respostaDesada = (resposta) => {
      console.log(`Resposta seleccionada: ${resposta}`);
    };

    return {
      objPreg,
      isEditing,
      currentEditIndex,
      novaPregunta,
      toggleCRUD,
      addOrUpdatePregunta,
      editPregunta,
      deletePregunta,
      cancelEdit,
      respostaDesada,
    };
  }
};
</script>

<style>
</style>
