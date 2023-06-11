package com.erdemkurt.sbecommerce.dao;

import com.erdemkurt.sbecommerce.entity.Product;
import com.erdemkurt.sbecommerce.entity.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory",path="product-category")

public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {


}
