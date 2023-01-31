import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceModel } from '../api/resource.model';

import { ListComponent } from './list.component';
import { imports } from './list.module';

class MockModel extends ResourceModel<MockModel> {
  name!: string;
}
describe('ListComponent', () => {
  let component: ListComponent<MockModel>;
  let fixture: ComponentFixture<ListComponent<MockModel>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [...imports, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent<MockModel>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
