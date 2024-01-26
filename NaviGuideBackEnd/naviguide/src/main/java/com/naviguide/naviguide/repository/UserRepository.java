package com.naviguide.naviguide.repository;
import com.naviguide.naviguide.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<Users,String> {
    Users findByUserName(String username);
}
