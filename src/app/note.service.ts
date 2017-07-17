import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class NoteService{    

  // copy notes data from home page 
  notes;

  constructor(private storage : Storage, private db: AngularFireDatabase){      
  }  

  fetchNotes(){   
    return this.db.list('/notes/');
    /*     
    return this.storage.get('notes') // returns a promise which returns data or error    
      .then(
        (notes) => {
        // assign to this.expenses only if not null. When first //strt, can be null. If null, assign empty array []
          notes? this.notes = notes : this.notes = [];                                                      
      })  
      .catch(
        err => console.log(err)
      );   
      */               
  }  

  removeNote(note){
    this.db.object('/notes/'+note.$key).remove()
      .then( x=> console.log("SUCCESS"))
      .catch( error => {
        alert("Could not delete note.");
        console.log("ERROR", error)
      });

    /*
      let index = this.notes.indexOf(note);
      if(index > -1){
        this.notes.splice(index,1);
        this.writeToStorage();
      }
      */
  }

  addNote(note){    
    this.db.list('/notes/').push({   
        title: note.title,             
        content: note.content,
        date: note.date        
    });   

    //this.notes.push(note);
    //this.writeToStorage();        
  } 

  editNote(note){
    this.db.object('/notes/'+note.$key).update({
        title: note.title,             
        content: note.content,
        date: note.date        
    });                
  }  
}
