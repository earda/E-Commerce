import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products:Product[]=[];
  currentCategoryId!: number;
  currentCategoryName: string = "";
  constructor(private productService: ProductService,
     private route: ActivatedRoute ){}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    
  }
  listProducts() {
    //check if "id" parameter is available
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id'); 
    

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
      
    }
    else{
      this.currentCategoryId = 1 ;
      this.currentCategoryName = 'Books';
    } 
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
