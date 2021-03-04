package pl.lendemark.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lendemark.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}
