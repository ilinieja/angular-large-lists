import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ResourceModel } from '../resource/resource.model';
import { ResourceService } from '../resource/resource.service';

import { ResourceListComponent } from './resource-list.component';
import { imports } from './resource-list.module';

class MockModel extends ResourceModel<MockModel> {
  name!: string;
}
const mockModelEntity1 = new MockModel({ id: 'testId1', name: 'testName1' });
const mockModelEntity2 = new MockModel({ id: 'testId2', name: 'testName2' });
const mockModelEntity3 = new MockModel({ id: 'testId3', name: 'testName3' });
const mockModelEntities = [
  mockModelEntity1,
  mockModelEntity2,
  mockModelEntity3,
];

describe('ResourceListComponent', () => {
  let component: ResourceListComponent<MockModel>;
  let fixture: ComponentFixture<ResourceListComponent<MockModel>>;
  let mockResourceService: jasmine.SpyObj<ResourceService<MockModel>>;

  beforeEach(async () => {
    mockResourceService = jasmine.createSpyObj<ResourceService<MockModel>>(
      'mockResourceService',
      ['get']
    );
    mockResourceService.get.and.returnValue(of(mockModelEntities));

    await TestBed.configureTestingModule({
      imports: [...imports, NoopAnimationsModule],
      declarations: [ResourceListComponent],
      providers: [
        { provide: ResourceService<MockModel>, useValue: mockResourceService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceListComponent<MockModel>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get list items on init', () => {
    expect(mockResourceService.get).toHaveBeenCalledTimes(1);
  });

  it('should pass items to selection list', fakeAsync(() => {
    component.items.subscribe((items) => {
      expect(items).toEqual(mockModelEntities);
    });
  }));

  it('should hide loading after items received', fakeAsync(() => {
    component.items.subscribe(() => {
      expect(
        fixture.debugElement.query(By.css('.loader-container'))
      ).toBeFalsy();
    });
  }));

  it('should request new items on search change', fakeAsync(() => {
    const query = 'testQuery';
    const input = fixture.debugElement.query(By.css('.search-input input'));
    input.nativeElement.value = query;
    input.nativeElement.dispatchEvent(new Event('input'));
    tick(400);

    expect(mockResourceService.get).toHaveBeenCalledWith({ query });
  }));
});
