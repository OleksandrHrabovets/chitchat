package com.group.chitchat.repository;

import com.group.chitchat.model.Chitchat;
import com.group.chitchat.model.Language;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChitchatRepo extends JpaRepository<Chitchat, Long> {

  List<Chitchat> findAllByLanguage(Language language);

}
