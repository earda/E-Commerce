package com.erdemkurt.sbecommerce.dao;

import com.erdemkurt.sbecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {

}
