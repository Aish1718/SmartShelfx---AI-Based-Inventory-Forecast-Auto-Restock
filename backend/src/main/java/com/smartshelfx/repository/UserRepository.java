// package com.smartshelfx.repository;

// import com.smartshelfx.model.User;
// import com.smartshelfx.model.enums.Role;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;
// import java.util.Optional;
// import java.util.List;

// @Repository
// public interface UserRepository extends JpaRepository<User, Long> {
//     Optional<User> findByEmail(String email);
//     Boolean existsByEmail(String email);
//     List<User> findByRole(Role role);
//     List<User> findByIsActive(Boolean isActive);
// }



// Path: backend/src/main/java/com/smartshelfx/repository/UserRepository.java

package com.smartshelfx.repository;

import com.smartshelfx.model.User;
import com.smartshelfx.model.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByRole(Role role);
    List<User> findByIsActive(Boolean isActive);
    Long countByRole(Role role);
}