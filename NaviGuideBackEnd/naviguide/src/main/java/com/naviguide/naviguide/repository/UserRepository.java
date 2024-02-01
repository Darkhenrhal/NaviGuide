package com.naviguide.naviguide.repository;
import com.naviguide.naviguide.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<Users,String> {
    Users findByUserName(String userName);
    void deleteByUserName(String userName);

    //List<Users> findByAccCatagory(String accCategory);

    @Query(value = "{'accCategory':?0}")
    List<Users> findByAccCategory(String accCategory);
}
