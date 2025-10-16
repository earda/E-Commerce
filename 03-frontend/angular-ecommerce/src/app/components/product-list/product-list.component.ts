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
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;

  thePageNumber:number=1;
  thePageSize:number=10;
  theTotalElements:number=0;
  
  constructor(private productService: ProductService,
     private route: ActivatedRoute ){}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    
  }
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode)
    {this.handleSearchProducts();} 
    else{
    this.handleListProducts();
    }
  }
  handleSearchProducts(){
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }
  handleListProducts(){
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id'); 
      
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!; 
    }
    else{
      this.currentCategoryId = 1 ;
      this.currentCategoryName = 'Books';
    } 

    if(this.previousCategoryId !=this.currentCategoryId){
      this.thePageNumber=1;
    }

    this.previousCategoryId =this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber-1,this.thePageSize,this.currentCategoryId)
    .subscribe(data =>{
      this.products=data._embedded.products;
      this.thePageNumber= data.page.number+1;
      this.thePageSize = data.page.size;
      this.theTotalElements=data.page.totalElements;
    });
  }
}
