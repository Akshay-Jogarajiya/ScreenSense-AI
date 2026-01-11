package com.ScreenSense.ScreenSense.AI.repo;

import com.ScreenSense.ScreenSense.AI.entity.UsageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface UsageRepo extends JpaRepository<UsageEntity, Integer> {

    List<UsageEntity> findByDate(LocalDate date);

    List<UsageEntity> findByUserIdAndDate(Long userId, LocalDate date);

    List<UsageEntity> findByUserIdAndDateBetween(
            Long userId,
            LocalDate start,
            LocalDate end
    );
}
