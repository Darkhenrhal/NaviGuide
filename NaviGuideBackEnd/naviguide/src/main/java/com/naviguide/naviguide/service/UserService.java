package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    //void saveOrUpdate(Users users);

    //Iterable<Users> listAll();

    String save(Users user);

    Users getUserByUserName(String userName);

    abstract Users getByEmail(String email);

    void update(Users user);

    void deleteUser(String userName);

    List<Users> getByAccCatagory(String accCategory);

    Page<Users> search(String firstName, String lastName, String organizationName, String accCategory, String proffesion, Pageable pageable);

    Iterable<Users> listAll();

    Iterable<Users> getAllUsers();

    List<String> getAllUserEmails();

    Users getUserByEmail(String email);

    List<Users> getAllUsersByOrg(String organizationName);



    //Users getUserByUserName(String userName);

    // void deleteUser(String userId);

    //Users getUserByid(String userId);

    //Users getUserByUsername(String username);
}
