import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherForm:FormGroup;
  weather:any;
  
  constructor(private x: FormBuilder,private weatherService:WeatherService) { }

  ngOnInit() {

    this.weatherForm = this.x.group({
      city: ['',[Validators.required,Validators.minLength(6)]],
      
    
    })
  }

  Search(){
    this.weatherService.addcity(this.weatherForm.value).subscribe(
      (data) => {
          console.log('here data', data.result);
          this.weather=data.result
         

      }
    );

  }

}
