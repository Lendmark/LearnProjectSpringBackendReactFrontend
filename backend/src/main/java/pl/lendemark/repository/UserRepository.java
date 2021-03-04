package pl.lendemark.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lendemark.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
