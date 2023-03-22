import { Component } from '@angular/core';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages: { text: string; type: string }[] = [
    { text: '', type: 'bot' }
  ];
  
  constructor (private searchService: SearchService){}


  userInput: string = '';
  isLoading: boolean = false;
  defaultMessage: string = "Je suis désolé, je n'ai pas compris ce que vous avez dit."
 
  onSubmit() {
    if (this.userInput.trim() === '') return;

    this.messages.push({ text: this.userInput, type: 'user' });

    this.isLoading = true;

    setTimeout(() => {
      const botReply = this.getBotReply(this.userInput);
      this.messages.push({ text: botReply, type: 'bot' });
      this.userInput = '';
      this.isLoading = false;
    }, 1000);
  }
  

  getBotReply(userInput: string): string {
    // questions et reponses
    const wordsAndAnswers = [
      { words: ['hi', 'hello', 'hey','salut','slt','bjr','bonjour','comment tu va '], answer: 'Bonjour ! Comment puis-je vous aider?' },
      { words: ['comment tu va ', 'cava',], answer: 'Je suis un agent conversationnel , merci de me demander ! Comment puis je vous aider?' },
      { words: ['bye', 'goodbye', 'au revoir'], answer: 'Au revoir! Passe une bonne journée.' }
    ];

    const normalizedUserInput = userInput.toLowerCase().trim();

    for (const { words, answer } of wordsAndAnswers) {
      const matchedWords = words.filter(w => normalizedUserInput.includes(w));
      if (matchedWords.length > 0) {
        return answer;
      }
    }
    // console.log(this.userInput);
    
    //this.searchService.getProduct(this.userInput).subscribe((response:any)=>{
     // console.log(response);
     // console.log(response[0].nom);
      // this.defaultMessage =  response[0].nom + "; description " + response[0].description  + "; prix " +response[0].prix
      
      
   // })
   this.searchService.getProduct(this.userInput).subscribe((response:any)=>{
    console.log(response);
    this.defaultMessage = ''
    response.forEach((item:any) => {
      console.log(item.nom);
      this.defaultMessage += item.nom + "; description " + item.description  + "; prix " + item.prix ;
    });
  });
  

    return this.defaultMessage;
  }
  startChat() {
    this.messages.push({
      type: 'bot', text: 'Veuillez entrer le nom du produit que vous souhaitez avoir des informations. ',
    });
  }
}
