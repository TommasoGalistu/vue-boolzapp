const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
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
    ])

    onMounted(() => {
});

    return {
      contacts
    };
  }
}).mount('#app');


    
