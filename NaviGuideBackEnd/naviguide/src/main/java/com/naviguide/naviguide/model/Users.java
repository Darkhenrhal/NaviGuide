package com.naviguide.naviguide.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document//(collation = "Users")
public class Users {
    @Id
    private int  userid;
    private String firstName;
    private String lastName;
    private int phoneNumber;
    private int altPhoneNumber;
    private String organizationName;
    private String email;
    private String accCategory;
    private String proffesion;
    private String userName;
    private String password;
    private String rePassword;
    private String userType;

}
