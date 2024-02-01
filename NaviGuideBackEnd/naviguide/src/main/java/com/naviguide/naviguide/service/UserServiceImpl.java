package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Users;
import com.naviguide.naviguide.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public String save(Users user){
        return userRepository.save(user).getUserid();
    }

    @Override
    public Users getUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    public void update(Users user) {
        userRepository.save(user);
    }

    @Override
    public void deleteUser(String userName) {
        userRepository.deleteByUserName(userName);
    }

    @Override
    public List<Users> getByAccCatagory(String accCategory) {
        return userRepository.findByAccCategory(accCategory);
    }


//    @Override
//    public void saveOrUpdate(Users users){
//        userRepository.save(users);
//
//    }


//    @Override
//    public Iterable<Users> listAll() {
//        return this.userRepository.findAll();
//    }
//
//    @Override
//    public String save(Users user) {
//        return userRepository.save(user).getUserid();
//    }
//
//    @Override
//    public Users getUserByUserName(String userName) {
//        return userRepository.findByUserName(userName);
//    }
//
//    @Override
//    public void deleteUser(String userId) {
//        System.out.println("Im here3");
//        userRepository.deleteById(userId);
//        System.out.println("Im here 4");
//    }
//
//    @Override
//    public Users getUserByid(String userId) {
//
//        return userRepository.findById(userId).get();
//    }
//
//    @Override
//    public Users getUserByUsername(String username) {
//
//        return userRepository.findByUserName(username);
//    }
//


}
