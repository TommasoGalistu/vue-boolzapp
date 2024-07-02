const { createApp, ref, onMounted, computed, nextTick } = Vue;

createApp({
    setup() {

        const datiPersonali = ref({
            name: 'Tommaso Galistu',
            avatar: './img/img12.png',
            visible: true,
        })
        // elenco dati persone
        const contacts = ref([
            {
                name: 'Michele',
                avatar: './img/img1.png',
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
                avatar: './img/img2.png',
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
                avatar: './img/img3.png',
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
                avatar: './img/img4.png',
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
                avatar: './img/img5.png',
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
                avatar: './img/img6.png',
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
                avatar: './img/img7.png',
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
                avatar: './img/img8.png',
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
                avatar: './img/img9.png',
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
                avatar: './img/img10.png',
                visible: true,
                messages: [],
            }
        ]);

        // input utente per filtrare persone
        const inputForFilter = ref('');
        // variabile che decide quali amici, filtrati o no, 
        // da aggiungere alla lista
        const contatti = ref('');
        // numero che va ad aggiornare le chat al click
        const numAmico = ref(0);
        const indiceFiltrato = ref(null);
        // numero che identifica la posizione del messaggio in chat
        const selectedMessage = ref(null);
        // costante per sapere se il menu della chat è stato cliccato
        const clickedMenu = ref(null);
        
        // messaggio nuovo da inviare da input
        var DateTime = luxon.DateTime;
        const orario = DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss');
        const messaggioNuovo = ref(
            {
                date: orario.toString(),
                message: '',
                status: 'sent'
            });
        // format risposta automatica
        const risposta = ref([
            {
                date: orario.toString(),
                message: 'OK!!',
                status: 'received'
            },
            {
                date: orario.toString(),
                message: 'Non mi scrivere mai più!!',
                status: 'received'
            },
            {
                date: orario.toString(),
                message: 'Non mi interessa..',
                status: 'received'
            },
            {
                date: orario.toString(),
                message: 'Ti denuncio',
                status: 'received'
            },
            {
                date: orario.toString(),
                message: 'Non stooo...',
                status: 'received'
            },
            {
                date: orario.toString(),
                message: 'Carmineeeee',
                status: 'received'
            },
            {
                date: orario.toString(),
                message: 'Marooonn',
                status: 'received'
            },
        ]

        );

        const UltimoAccessoOrario = ref('');
        // l'icona notifiche cambia al click
        const cambiaNotifiche = ref(true);
        // costanti che indicano quale testo far apparire(guarda funzione invioMess)
        const isSent = ref(true);
        const isOnline = ref(false);
        // costante che decide che fa apparire pubblicità 
        // di benvenuto e non la prima chat
        const startPage = ref(false);
        // colori da cambiare con il click
        const backgroundStyle = ref({});
        const colorBlack = ref({});
        const switchCounter = ref(false)

        // inizio funzioni


        // inserimento dinamico della chat
        // la funzione è presente nel file html
        const messaggioInviato = (messaggio) => {
            return messaggio.message

        };

        // click della persona e visualizzazione della chat
        const selezionaPersona = (posizione) => {
            // Trova l'indice originale della persona selezionata nella lista completa
            const indiceOriginale = contacts.value.findIndex(persona => persona.name === filtraAmici.value[posizione].name);
            numAmico.value = indiceOriginale;
            // per far si che al click colori la persona selezionata
            indiceFiltrato.value = posizione;
            // chiudi le possibili finestre aperte
            clickedMenu.value = false;
            // quando clicchi su una chat si chiude la pubblicità 
            // e si apre la chat
            startPage.value = true
        };

        // invio messaggio e risposta automatica dopo 2 secondi
        const invioMessaggio = () => {
            // modalità fake di risposta dell'utente
            // diventa online
            setTimeout(() => {
                isSent.value = false;
                isOnline.value = true;
            }, 2000)
            // sta scrivendo dopo 4 secondi che è online
            setTimeout(() => {
                isOnline.value = false;
            }, 4000)
            // finisce di scrivere e diventa online di nuovo
            setTimeout(() => {
                isOnline.value = true;
            }, 7500)
            // in 8 secondi manda il mess(guarda settimeout sotto)
            // e esce dalla chat facendo visualizzare l'ultimo accesso
            setTimeout(() => {
                isOnline.value = false;
                isSent.value = true;
            }, 10000)
            // inserimento della nuova chat se non è vuota di caratteri
            if (messaggioNuovo.value.message.trim().length > 0) {
                contacts.value[numAmico.value].messages.push({ ...messaggioNuovo.value });
                messaggioNuovo.value.message = ''
                // risposta random
                const numRandom = Math.floor(Math.random() * risposta.value.length)
                // risposta dopo 8.7 secondi
                setTimeout(() => {
                    contacts.value[numAmico.value].messages.push(risposta.value[numRandom]);

                }, 8700)
            }
        };

        // funzione che si attiva quando scrivo su input ricerca
        const ricercaPersone = () => {
            return filtraAmici
        }

        // nuova base dati filtrata(se c'è bisogno) e in ordine in
        // base all'ultimo messaggio ricevuto
        const filtraAmici = computed(() => {
            // filtro se c'è bisogno
            const filteredContacts = contacts.value.filter(persona =>
                persona.name.toLowerCase().includes(inputForFilter.value.toLowerCase())
            );
            // prendo tutti i contatti con messaggi e ultima data
            const sortedContacts = filteredContacts.map(persona => {
                const latestMessageDate = persona.messages.length > 0
                    ? DateTime.fromFormat(persona.messages[persona.messages.length - 1].date, 'dd/MM/yyyy HH:mm:ss')
                    : null;

                return {
                    ...persona,
                    latestMessageDate
                };
            });
            // li metto in ordine
            sortedContacts.sort((a, b) => {
                if (a.latestMessageDate && b.latestMessageDate) {
                    return b.latestMessageDate - a.latestMessageDate;
                }
                if (a.latestMessageDate) {
                    return -1;
                }

                if (b.latestMessageDate) {
                    return 1;
                }

            });
            
            return sortedContacts;

        });

        // apertura menu messaggio singolo
        const aperturaMenu = (messaggio) => {
            // chiudo, se è aperto, il menu di eliminazione completa chat
            clickedMenu.value = false;
            // se è aperto lo chiuse se è chiuso lo apro
            if (selectedMessage.value === messaggio) {
                selectedMessage.value = null; // Chiudi il menu se il messaggio è già selezionato
            } else {
                selectedMessage.value = messaggio; // Altrimenti apri il menu per il messaggio cliccato
            }
        };

        // attraverso il click di apertura menu prendo il messaggio
        // se rispetta la condizione si aprirà il menu con la 
        // classe visible
        const isVisible = (messaggio) => {
            console.log(messaggio)
            return selectedMessage.value === messaggio;
        };

        // elimino messaggio selezionato
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

        // inserimento di orario di invio messaggio nel messaggio
        const orarioMessaggio = (index) => {
            const oraioInvio = contacts.value[numAmico.value].messages[index].date.slice(11, 16);

            return oraioInvio
        };

        // attraverso un ciclo prendo l'ultimo orario del suo
        // messaggio e lo inserisco nello stato
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
        const menuChat = () => {
            if (!clickedMenu.value) {
                clickedMenu.value = true;
            } else {
                clickedMenu.value = false;
            }

        }

        // funzione per aprire e chiudere menu con classe per
        // eliminazione intera chat
        const isClicked = () => {
            return clickedMenu.value
        }

        // chiudo tutti le finestre menu se clicco sullo sfondo
        const chiudiTuttiMenu = () =>{
            clickedMenu.value = false;
            selectedMessage.value = null;
        }

        // funzione click per eliminare la chat dai dati
        const eliminateChat = (posizione) => {
            contacts.value.splice(posizione, 1)
            console.log('elimnate')
        }

        // cambio immagine per l'attivazione delle notifiche o contrario
        const notificaStatus = () => {
            if (cambiaNotifiche.value) {
                cambiaNotifiche.value = false;
            } else {
                cambiaNotifiche.value = true;
            }
        }

        // const aggiornaOra = () => {
        //     setInterval(() => {
        //         DateTime = luxon.DateTime;
        //         console.log('orario aggiornato', DateTime)
        //     }, 1000 * 60)
        // }
         
        // attraverso il click cambio il contenuto
        // dello style notte predefinito 
        const changeStyle = () => {
            if(!switchCounter.value){
                colorBlack.value = {color: 'black',}
                backgroundStyle.value = {
                    backgroundColor: '#000000',
                    color: 'white',
                    border: 'black'}
                    switchCounter.value = true
            }else{
                colorBlack.value = {}
                backgroundStyle.value = {};
                switchCounter.value = false
            }
            
        }

        onMounted(() => {
            // all'esecuzione di tutto uso la variabile
            // contatti per utilizzare una base dati diversa
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
            isClicked,
            datiPersonali,
            cambiaNotifiche,
            notificaStatus,
            // aggiornaOra,
            isSent,
            isOnline,
            startPage,
            changeStyle,
            backgroundStyle,
            colorBlack,
            chiudiTuttiMenu

        };
    }
}).mount('#app');

// problemi da risolvere


