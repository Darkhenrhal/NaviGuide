package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Users;
import com.naviguide.naviguide.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void saveOrUpdate(Users users){
        userRepository.save(users);

    }

    public Iterable<Users> listAll() {
        return this.userRepository.findAll();
    }


    public void deleteUser(String userId) {
        System.out.println("Im here3");
        userRepository.deleteById(userId);
        System.out.println("Im here 4");
    }

    public Users getUserByid(String userId) {

        return userRepository.findById(userId).get();
    }

    public Users getUserByUsername(String username) {

        return userRepository.findByUserName(username);
    }



}
