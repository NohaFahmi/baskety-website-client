import {Component, Input} from '@angular/core';
import {JsonPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ItemsListSectionComponent} from "../items-list-section/items-list-section.component";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {ITEM_CARD_MODES, ItemCardComponent} from "../item-card/item-card.component";
import {SIDENAV_VIEWS} from "../../interfaces/common.interface";
import {SideViewsService} from "../../services/side-views/side-views.service";
import {IList, ShoppingListStatus} from "../../interfaces/list.interface";
import {ShoppingListService} from "../../services/shopping-list/shopping-list.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {IItem} from "../../interfaces/item.interface";

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ButtonModule,
    ItemsListSectionComponent,
    InputGroupModule,
    InputTextModule,
    NgIf,
    ItemCardComponent,
    NgForOf,
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent {
  protected readonly ITEM_CARD_MODES = ITEM_CARD_MODES;
  _shoppingList: IList | null = null;
  listTitle: FormControl;
  isEditMode: boolean = false;


  @Input()
  set shoppingList(value: IList | null) {
    this.listTitle.setValue(this.shoppingListService.currentShoppingList()?.name);
    this._shoppingList = value;
  }

  get shoppingList(): IList | null {
    return this._shoppingList;
  }
  constructor(public sideViewsService: SideViewsService,
              protected shoppingListService: ShoppingListService) {
    this.listTitle = new FormControl({value: '',disabled: true});

  }
  ngOnInit(): void {
    this.listTitle.setValue(this.shoppingListService.currentShoppingList()?.name);
  }
  navigateToAddingItemView() {
    this.sideViewsService.updateCurrentSideView(SIDENAV_VIEWS.ADD_EDIT_ITEM);
  }
  onChangeListTitle(): void {
    this.shoppingListService.updateShoppingTitle(this.listTitle.value);
    this.listTitle.disable();
    this.isEditMode = !this.isEditMode;
  }
  onEditListTitle(): void {
    this.listTitle.enable();
    this.isEditMode = !this.isEditMode;
  }
  updateList(item: IItem): void {
    this.shoppingListService.removeItemFromShoppingList(item);
  }
  updateItemOnList(item: IItem): void {
    this.shoppingListService.updateItemInShoppingList(item);
  }
  onCompleteList(list: IList | null): void {
    if (list) {
      let updatedList: IList = {
        ...list,
        status: ShoppingListStatus.COMPLETED
      }
      this.shoppingListService.updateShoppingList(updatedList, 'COMPLETED');
      this.sideViewsService.toggleDisplaySideView();
    }
  }
  onCancelList(list: IList | null): void {
    if (list) {
      let updatedList: IList = {
        ...list,
        status: ShoppingListStatus.CANCELLED
      }
      this.shoppingListService.updateShoppingList(updatedList, 'CANCELED');
      this.sideViewsService.toggleDisplaySideView();
    }
  }
}
