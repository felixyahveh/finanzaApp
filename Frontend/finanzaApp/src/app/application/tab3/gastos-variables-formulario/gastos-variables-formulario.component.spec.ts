import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GastosVariablesFormularioComponent } from './gastos-variables-formulario.component';

describe('GastosVariablesFormularioComponent', () => {
  let component: GastosVariablesFormularioComponent;
  let fixture: ComponentFixture<GastosVariablesFormularioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosVariablesFormularioComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GastosVariablesFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
