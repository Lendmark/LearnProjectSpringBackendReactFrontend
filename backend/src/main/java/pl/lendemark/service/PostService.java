package pl.lendemark.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import pl.lendemark.model.Post;
import pl.lendemark.model.User;
import pl.lendemark.repository.PostRepository;
import pl.lendemark.repository.UserRepository;

import java.util.Optional;

@RestController
public class PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/posts")
    public ResponseEntity addPost (@RequestHeader("username") String username, @RequestBody String postBody){
        Optional<User> userFromDB = userRepository.findByUsername(username);

        if(userFromDB.isEmpty()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Post post = new Post(userFromDB.get(), postBody);
        Post savedPost = postRepository.save(post);

        return ResponseEntity.ok(savedPost);
    }
}
