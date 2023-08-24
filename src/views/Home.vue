<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app>
    <VRow>
      <div
        class="d-flex justify-center align-center align-content-center vh-100 mt-16 mx-auto w-100"
      >
        <vContainer>
          <v-sheet
            elevation="1"
            max-width="600"
            rounded="lg"
            width="100%"
            class="pa-2 text-center mt-10"
            fat
          >
            <v-form validate-on="submit lazy" @submit.prevent="sendDatafromAPI">
              <div class="text-center">
                <h5 class="text-center text-h5 mb-5">ARODISI-API</h5>
                <small class="text-center"
                  >Preenchimento automatico de formulário via NIF ou BI</small
                >
              </div>
              <v-radio-group inline label="Consultar por" v-model="tipo">
                <v-radio
                  label="NIF"
                  value="NIF"
                  @click="tipo = 'NIF'"
                  check
                ></v-radio>
                <v-radio label="BI" value="BI" @click="tipo = 'BI'"></v-radio>
              </v-radio-group>
              <v-text-field
                v-model="num_identificacao"
                label="NIF OU BI"
              ></v-text-field>
              <div v-if="tipo == 'BI'">
                <div class="div">
                  <v-text-field
                    label="Nome"
                    variant="solo-filled"
                    v-model="nome"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    label="Data Nascimento"
                    variant="solo-filled"
                    v-model="data_nasc"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    label="Nome do Pai"
                    variant="solo-filled"
                    v-model="pai"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    label="Nome da Mãe"
                    variant="solo-filled"
                    v-model="mae"
                    readonly
                  ></v-text-field>
                </div>
              </div>

              <div v-if="tipo == 'NIF'">
                <v-text-field
                  label="Nome"
                  variant="solo-filled"
                  v-model="nome"
                  readonly
                ></v-text-field>
              </div>
              <v-alert
                v-if="alerta.msg"
                title="ERRO"
                :text="alerta.msg"
                type="error"
                variant="tonal"
              ></v-alert>
              <v-btn
                :loading="loading"
                type="submit"
                block
                class="mt-2"
                text="Consultar Dados"
                color="error"
                size="large"
              ></v-btn>
              <div class="text-center mb-4 mt-4">
                Prototipado por <a href="" class="text-dark">MR. PHP</a>
              </div>
            </v-form>
          </v-sheet>
        </vContainer>
      </div>
    </VRow>

    <v-row>
      <v-dialog v-model="dialog" width="100%">
        <v-card>
          <v-card-title>
            <span class="text-h5">Resultado da consulta</span>
          </v-card-title>

          <div>
            <pre>
                {{ JSON.stringify(dadosConsulta, null, 2) }}
              </pre
            >
          </div>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn color="primary" variant="text" @click="dialog = false">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      loading: false,
      num_identificacao: "",
      nome: "",
      data_nasc: "",
      pai: "",
      mae: "",
      dadosConsulta: [],
      dialog: false,
      alerta: {
        tipo: false,
        msg: false,
      },
      tipo: "BI",
    };
  },

  methods: {
    sendDatafromAPI() {
      this.loading = true;
      this.$axios(
        `/index.php?id=${this.num_identificacao}&acao=get&tipo=${this.tipo}`,
        {
          documento: this.num_identificacao,
          acao: "send",
        }
      ).then((response) => {
        if (response) {
          this.dialog = true;
          this.dadosConsulta = response.data;

          if (this.tipo == "BI") {
            this.data_nasc = response.data.data.data_nasc;
            this.pai = response.data.data.pai_nome_completo;
            this.mae = response.data.data.mae_nome_completo;
            this.loading = false;
          } else {
            this.nome = response.data.data.noContribuinte;
            this.loading = false;
          }
        } else {
          this.loading = false;
          this.alerta.msg = "BI OU NIF INVÁLIDO";

          setInterval(() => {
            this.alerta.msg = false;
          }, 3000);
        }
      });
    },
  },
};
</script>
