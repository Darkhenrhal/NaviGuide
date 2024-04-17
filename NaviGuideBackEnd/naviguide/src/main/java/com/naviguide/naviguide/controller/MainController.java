package com.naviguide.naviguide.controller;

import com.naviguide.naviguide.model.Resources;
import com.naviguide.naviguide.model.Users;
import com.naviguide.naviguide.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/user")

public class MainController {

    //try to implement sessions

    @Autowired
    private UserService userServices;

    private String sessionUser;
    private HttpSession session;

    @Autowired
    private PasswordEncoder passwordEncoder;



    //Update User (Working)
    @PutMapping(value = "/updateuser/{userName}")//working
    public Users updateUser(@RequestBody Users user,@PathVariable(name="userName") String userName){
        user.setUserName(userName);
        userServices.deleteUser(userName);

        userServices.update(user);
        return user;
    }

    //Add images to google drive
    @PostMapping("/uploadimages")
    public Object handleFileUpload(@RequestParam ("image") MultipartFile file) throws IOException {
        if(file.isEmpty()){
            return "File is empty";
        }
        File tempFile = File.createTempFile("temp",null);
        file.transferTo(tempFile);
        Resources res=userServices.uploadImageToDrive(tempFile);
        System.out.println(res);
        return res;
    }

    //Get all users (Working)
    @GetMapping(value = "/getallusers")
    public Iterable<Users> getAllUsers(HttpSession session){
        System.out.println("Session is working"+session.getAttribute("user"));
        return userServices.getAllUsers();

    }

    //Get all user emails (Working)
    @GetMapping("/getalluseremails")
    public List<String> getAllUserEmails() {
        return userServices.getAllUserEmails();
    }

    //Save user (Working)
    @PostMapping(value = "/save")//working
    private String saveUser(@RequestBody Users user) {
        return userServices.save(user);
    }

    //Get user by username (Working)
    @GetMapping(value = "getuser/{userName}")
    public Users getUserByUserName(@PathVariable("userName") String userName){
        return userServices.getUserByUserName(userName);
    }

    //Get all users (Working)
    @GetMapping(value = "/allusersbyorg/{organizationName}")
    public List<Users> getAllUsersByOrg(@PathVariable("organizationName") String organizationName){
        return userServices.getAllUsersByOrg(organizationName);
    }


    //Delete User (Working)
    @DeleteMapping(value = "/deleteuser/{userName}")//working
    public void delete(@PathVariable String userName){
        userServices.deleteUser(userName);
    }

    //Get user by Email (Working)
    @GetMapping(value ="getuserbyemail/{email}")//working
    public Users getUserByEmail(@PathVariable("email") String email){
        return userServices.getUserByEmail(email);
    }

    //Search by Category (Working)
    @GetMapping(value = "/getaccbycatagory/{accCategory}")//working
    public List<Users> getByAccCatagory(@PathVariable String accCategory ){
        return userServices.getByAccCatagory(accCategory);
    }


    //Search by type
    @GetMapping(value = "/search")
    public Page<Users> searchUser(
            @RequestParam(required = false)String firstName,
            @RequestParam(required = false)String lastName,
            @RequestParam(required = false)String organizationName,
            @RequestParam(required = false)String accCategory,
            @RequestParam(required = false)String proffesion,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "5") Integer size

    ){
        Pageable pageable
                = PageRequest.of(page,size);
        
        return userServices.search(firstName,lastName,organizationName,accCategory,proffesion,pageable);
    }

    //User Login (Working)
    @PostMapping(value = "/login")
    public ResponseEntity<String> login(@RequestBody Users loginUser, HttpSession session) {
        String userEmail = loginUser.getEmail();
        String password = loginUser.getPassword();
        Users user = userServices.getUserByEmail(userEmail);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            session.setAttribute("user",user);
            System.out.println("Session created :"+session.getAttribute("user"));
            System.out.println("Session Id :"+session.getId());
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Email or Password");
        }
    }
    //Get Session (Working)
    @GetMapping("/profile")
    public Users profile(HttpSession session) {
        Users user = (Users) session.getAttribute("user");
        System.out.println("Session in profile worked "+session.getAttribute("user"));
        if (user != null) {
            System.out.println("there is logged user :"+session.getAttribute("user"));
            System.out.println("Session Id :"+session.getId());
            return user;
        } else {
            System.out.println("Error in keep session and it be null.");
            return null;
        }
    }



}
