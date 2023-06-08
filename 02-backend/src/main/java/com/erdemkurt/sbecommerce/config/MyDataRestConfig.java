package com.erdemkurt.sbecommerce.config;

import com.erdemkurt.sbecommerce.dao.ProductRepository;
import com.erdemkurt.sbecommerce.entity.Product;
import com.erdemkurt.sbecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    private EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
     //   RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};

        //disable HTTP methos for Product : PUT , POST and DELETE for read only

        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));

        //disable HTTP methos for ProductCategory : PUT , POST and DELETE for read only

        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));

        exposeIds(config);

    }

    private void exposeIds(RepositoryRestConfiguration config){
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        List<Class> entityClasses = new ArrayList<>();

        for (EntityType tempEntityType : entities)
        {
            entityClasses.add(tempEntityType.getJavaType());
        }

        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
    @Autowired
    public MyDataRestConfig(EntityManager eentityManager){
        entityManager = eentityManager;
    }
}
