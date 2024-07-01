const { createApp, ref, onMounted, computed } = Vue;

createApp({
    setup() {

        // elenco dati persone
        const contacts = ref([
            {
                name: 'Michele',
                avatar: './img/avatar_1.png',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: './img/avatar_2.png',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: './img/avatar_3.png',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: './img/avatar_4.png',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: './img/avatar_5.png',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: './img/avatar_6.png',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: './img/avatar_7.png',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: './img/avatar_8.png',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Barbara',
                avatar: './img/avatar_8.png',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ho finalmente pulito la lettiera',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Brava, hai fatto il tuo lavoro!!!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Non ti permettere mai più, da oggi in poi non la pulisco più',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Gaia',
                avatar: './img/avatar_8.png',
                visible: true,
                messages: [],
            }
        ]);
        // contatti filtrati da input utente
        // const contactsFilter = ref([]);
        // input utente per filtrare persone
        const inputForFilter = ref('');
        // variabile che decide quali amici, filtrati o no, da aggiungere alla lista
        const contatti = ref('');
        // numero che va ad aggiornare le chat al click
        const numAmico = ref(0);
        const indiceFiltrato = ref(null);
        // numero che identifica la posizione del messaggio in chat
        const selectedMessage = ref(null);
        // costante per sapere se il menu della chat è stato cliccato
        const clickedMenu = ref(null);
        // classe per visualizzazione chat attiva
        // const active = ref('');
        // messaggio nuovo da inviare da input
        var DateTime = luxon.DateTime;
        const orario = DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss').toString();
        const messaggioNuovo = ref(
            {
                date: orario,
                message: '',
                status: 'sent'
            });
        // format risposta automatica
        const risposta = ref([
            {
                date: orario,
                message: 'OK!!',
                status: 'received'
            },
            {
                date: orario,
                message: 'Non mi scrivere mai più!!',
                status: 'received'
            },
            {
                date: orario,
                message: 'Non mi interessa..',
                status: 'received'
            },
            {
                date: orario,
                message: 'Ti denuncio',
                status: 'received'
            },
            {
                date: orario,
                message: 'Non stooo...',
                status: 'received'
            },
            {
                date: orario,
                message: 'Carmineeeee',
                status: 'received'
            },
            {
                date: orario,
                message: 'Marooonn',
                status: 'received'
            },
        ]

        );

        const UltimoAccessoOrario =ref('')





        // inizio funzioni
        // inserimento dinamico della chat
        const messaggioInviato = (messaggio) => {
            return messaggio.message

        };

        // click della persona e visualizzazione della chat
        const selezionaPersona = (posizione) => {
            // Trova l'indice originale della persona selezionata nella lista completa
            const indiceOriginale = contacts.value.findIndex(persona => persona.name === filtraAmici.value[posizione].name);
            numAmico.value = indiceOriginale;
            indiceFiltrato.value = posizione;
            // chiudi le possibili finestre aperte
            clickedMenu.value = false;
        };

        // invio messaggio e risposta automatica dopo 2 secondi
        const invioMessaggio = () => {

            if (messaggioNuovo.value.message.trim().length > 0) {
                contacts.value[numAmico.value].messages.push({ ...messaggioNuovo.value });
                messaggioNuovo.value.message = ''
                const numRandom = Math.floor(Math.random() * risposta.value.length)
                setTimeout(() => {
                    contacts.value[numAmico.value].messages.push(risposta.value[numRandom]);
                    
                }, 3000)
            }
        };

        
        const ricercaPersone = () => {
            return filtraAmici
        }
        // ricerca persone nella barra input
        const filtraAmici = computed(() => {
            return contacts.value.filter(persona => {
                return persona.name.toLowerCase().includes(inputForFilter.value.toLowerCase());
            });
        });

        const aperturaMenu = (messaggio) => {
            if (selectedMessage.value === messaggio) {
                selectedMessage.value = null; // Chiudi il menu se il messaggio è già selezionato
            } else {
                selectedMessage.value = messaggio; // Altrimenti apri il menu per il messaggio cliccato
            }

        };

        const isVisible = (messaggio) => {
            return selectedMessage.value === messaggio;
        };

        const eliminateMessage = (posMessaggio) => {
            if (contacts.value[numAmico.value].messages.length > 0) {
                contacts.value[numAmico.value].messages.splice(posMessaggio, 1)
            }

        }
        // orario dell'ultimo messaggio inviato o ricevuto
        const ultimoMessaggio = (amico) => {
            const messaggi = amico.messages;
            const messaggio = messaggi[messaggi.length - 1];
            return messaggio.date.slice(11, 16);
        };
        const orarioMessaggio = (index) => {
            const oraioInvio = contacts.value[numAmico.value].messages[index].date.slice(11, 16);

            return oraioInvio
        };
        const statoAmicoChat = (posizione) => {
            const ultimoAccesso = contacts.value[posizione].messages;
            
            for (let i = ultimoAccesso.length - 1; i >= 0; i--) {
                
                if (ultimoAccesso[i].status === 'received') {
                    UltimoAccessoOrario.value = `Ultimo accesso il ${ultimoAccesso[i].date.slice(0, 10)} alle ${ultimoAccesso[i].date.slice(11, 16)}`
                    return UltimoAccessoOrario
                }
            }
        }
        // funzione per aprire il menu eliminazione chat
        const menuChat = () =>{
            if(!clickedMenu.value){
                clickedMenu.value = true;
            }else{
                clickedMenu.value = false;
            }
            
        }
        // funzione per aprire e chiudere menu con classe
        const isClicked = () =>{
            return clickedMenu.value
        }
        // funzione click per eliminare la chat dai dati
        const eliminateChat = (posizione) =>{
            contacts.value.splice(posizione, 1)
            console.log('elimnate')
        }


        onMounted(() => {
            contatti.value = filtraAmici

        });

        return {
            contacts,
            messaggioInviato,
            numAmico,
            selezionaPersona,
            //   active,
            messaggioNuovo,
            invioMessaggio,
            risposta,
            filtraAmici,
            //   contactsFilter,
            inputForFilter,
            contatti,
            aperturaMenu,
            selectedMessage,
            isVisible,
            eliminateMessage,
            ultimoMessaggio,
            orarioMessaggio,
            ricercaPersone,
            indiceFiltrato,
            orario,
            statoAmicoChat,
            UltimoAccessoOrario,
            menuChat,
            eliminateChat,
            clickedMenu,
            isClicked
            
        };
    }
}).mount('#app');

// problemi da risolvere



// se elimino tutti i messaggio e vado a cliccare un'altra
// chat mi da errore