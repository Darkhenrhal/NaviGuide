package com.naviguide.naviguide.repository;

import com.naviguide.naviguide.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<Users,Integer > {

}
