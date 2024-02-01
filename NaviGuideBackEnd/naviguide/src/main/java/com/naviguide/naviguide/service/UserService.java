package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Users;

import java.util.List;

public interface UserService {
    //void saveOrUpdate(Users users);

    //Iterable<Users> listAll();

    String save(Users user);

    Users getUserByUserName(String userName);

    void update(Users user);

    void deleteUser(String userName);

    List<Users> getByAccCatagory(String accCategory);

    //Users getUserByUserName(String userName);

   // void deleteUser(String userId);

    //Users getUserByid(String userId);

    //Users getUserByUsername(String username);
}
