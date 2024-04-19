package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Users;
import com.naviguide.naviguide.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class UserServiceImpl implements UserService {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public String save(Users user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user).getUserid();
    }

    @Override
    public Users getUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    public Users getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<Users> getAllUsersByOrg(String organizationName) {
        return userRepository.findByorganizationName(organizationName);
    }
    @Override
    public Users getByEmail(String email) {
        return userRepository.findByEmail(email);
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

    @Override
    public Iterable<Users> listAll() {
        return this.userRepository.findAll();
    }

    @Override
    public Iterable<Users> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<String> getAllUserEmails() {
        List<String> userEmails = new ArrayList<>();
        Iterable<Users> allUsers = userRepository.findAll();

        for (Users user : allUsers) {
            userEmails.add(user.getEmail());
        }

        return userEmails;
    }

    @Override
    public Page<Users> search(String firstName, String lastName, String organizationName, String accCategory, String proffesion, Pageable pageable) {
        Query query=new Query().with(pageable);
        List<Criteria> criteria=new ArrayList<>();

        if(firstName!=null && !firstName.isEmpty()){
            criteria.add(Criteria.where("firstName").regex(firstName,"i"));
        }

        if(lastName!=null && !lastName.isEmpty()){
            criteria.add(Criteria.where("firstName").regex(lastName,"i"));
        }

        if(organizationName!=null && !organizationName.isEmpty()){
            criteria.add(Criteria.where("firstName").regex(organizationName,"i"));
        }

        if(accCategory!=null && !accCategory.isEmpty()){
            criteria.add(Criteria.where("firstName").regex(accCategory,"i"));
        }

        if(proffesion!=null && !proffesion.isEmpty()){
            criteria.add(Criteria.where("firstName").regex(proffesion,"i"));
        }

        if(!criteria.isEmpty()){
            query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[0])));
        }

        Page<Users> users= PageableExecutionUtils.getPage(
                mongoTemplate.find(query,Users.class), pageable, ()->mongoTemplate.count(query.skip(0).limit(0),Users.class));
        return users;
    }
}
