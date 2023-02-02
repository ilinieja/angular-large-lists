import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceModel } from '../api/resource.model';

import { ResourceListComponent } from './resource-list.component';
import { imports } from './resource-list.module';

class MockModel extends ResourceModel<MockModel> {
  name!: string;
}
describe('ResourceListComponent', () => {
  let component: ResourceListComponent<MockModel>;
  let fixture: ComponentFixture<ResourceListComponent<MockModel>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceListComponent],
      imports: [...imports, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceListComponent<MockModel>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
