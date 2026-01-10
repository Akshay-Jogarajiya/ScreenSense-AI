package com.ScreenSense.ScreenSense.AI.repo;

import com.ScreenSense.ScreenSense.AI.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Integer> {

    public Optional<User> findByEmailAndPassword(String email, String password);

    boolean existsByEmail(String email);
}
